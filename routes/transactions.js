const express = require('express');
const { Pool } = require('pg');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const wrap = require('express-async-wrapper');

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.post('/transactions', wrap(async (req, res, next) => {
  let charge;
  let client;
  let transactionId;

  try {
    client = await pool.connect();
    const promoCode = await validatePromoCode(req.body.promo_code, req.body.email, client);
    await validateTransaction(req.body, promoCode, client);
    let city;
    if (req.body.city) {
      city = req.body.city;
    } else if (req.body.pickup_location === 'orangeville') {
      city = 'Orangeville';
    } else if (req.body.pickup_location === 'waterloo') {
      city = 'Waterloo';
    }
    await client.query('BEGIN');
    const transaction = await client.query(`
      INSERT INTO
        transactions(
          first_name,
          last_name,
          email,
          address_line_1,
          city,
          province,
          postal_code,
          cents_charged_shipping,
          promo_code_id,
          cents_charged_total
        )
        VALUES (
          '${req.body.first_name.trim()}',
          '${req.body.last_name.trim()}',
          '${req.body.email.trim()}',
          '${(req.body.address_line_1 || '').trim()}',
          '${(city || '').trim()}',
          '${(req.body.province || '')}',
          '${(req.body.postal_code || '').toUpperCase().trim()}',
          ${req.body.cents_charged_shipping},
          ${promoCode ? promoCode.id : null},
          ${req.body.cents_charged_total}
        )
        RETURNING id
    `);
    transactionId = transaction.rows[0].id;
    let purchasedItems = req.body.cart.map((item) => {
      return `(${transactionId}, ${item.id}, ${item.cents_charged})`;
    });
    const purchasedItemsStr = purchasedItems.join(', ');
    await client.query(`
      INSERT INTO
        purchased_items(
          transaction_id,
          product_id,
          cents_charged
        )
        VALUES ${purchasedItemsStr}
    `);
    const itemsByCount = [];
    req.body.cart.forEach((item) => {
      let objForItem = itemsByCount.find((obj) => obj.name === item.name);
      if (!objForItem) {
        itemsByCount.push({
          cents: item.cents_charged,
          count: 1,
          name: item.name
        });
      } else {
        objForItem.count++;
      }
    });
    let description = itemsByCount.map((obj) => {
      return `${obj.count}x ${obj.name} ($${(obj.count * obj.cents / 100).toFixed(2)})`;
    }).join('\n');
    if (promoCode) {
      let percentOff;
      if (promoCode.product_slug) {
        const product = req.body.cart.find((obj) => obj.slug === promoCode.product_slug);
        if (product) {
          percentOff = `${promoCode.percent_off}% off ${product.name}`;
        }
      } else {
        percentOff = `${promoCode.percent_off}% off all items`;
      }
      description += `\nPromo code ${req.body.promo_code.toUpperCase()} (${percentOff})`;
    }
    if (req.body.cents_charged_shipping) {
      description += `\nShipping ($${(req.body.cents_charged_shipping / 100).toFixed(2)})`;
    }
    charge = await stripe.charges.create({
      amount: req.body.cents_charged_total,
      currency: 'cad',
      description,
      receipt_email: req.body.email,
      source: req.body.stripe_token_id
    });
    await client.query('COMMIT');
  } catch (e) {
    if (client) {
      await client.query('ROLLBACK');
      client.release();
    }
    // If the error is a string, it's one we've manually thrown. If statusCode exists,
    //  it's a Stripe error. In both of those cases, send out the given error message.
    if (typeof(e) === 'string' || !!e.statusCode) {
      console.error('Error in POST/transactions. Body:', req.body, ', Error:', e);
      return res.status(e.statusCode || 422).send(e.message || e);
    }
    // Otherwise, send out a generic error.
    console.error('Unexpected error in POST/transactions. Body:', req.body, ', Error:', e);
    return res.status(422).send('An error occurred. You did not get charged. Please try again later.');
  }

  try {
    await client.query(`
      UPDATE transactions
        SET
          stripe_charge_id = '${charge.id}',
          fraud_risk = ${(charge.outcome.risk_level !== 'normal')}
        WHERE id = ${transactionId}
    `);
  } catch (e) {
    console.error('Unexpected error in POST/transactions. Body:', req.body, ', Error:', e);
  } finally {
    client.release();
    res.sendStatus(201);
  }
}));

const validatePromoCode = async (code, email, client) => {
  if (code) {
    let result = await client.query(`
      SELECT
        id,
        product_slug,
        percent_off
      FROM promo_codes
        WHERE code = '${code.toLowerCase().trim()}'
          AND expired_at IS NULL;
    `);
    const promoCode = result.rows[0];
    if (!promoCode) {
      throw `Promo code '${code.toUpperCase()}' does not exist.`;
    }
    result = await client.query(`
      SELECT EXISTS (
        SELECT * FROM transactions
          WHERE promo_code_id = ${promoCode.id}
            AND email = '${email}'
      )
    `);
    if (result && result.rows && result.rows[0] && result.rows[0].exists) {
      throw 'You have already used this promo code before.';
    }
    return promoCode;
  }
};

const validateTransaction = async (vals, promoCode, client) => {
  // Validate required text inputs
  validate(vals.first_name, v.required, 'First name is required.');
  validate(vals.first_name, v.isString, 'First name does not have the correct format.');
  validate(vals.first_name, v.usesLegalLetters, 'First name contains invalid characters.');
  validate(vals.first_name, v.lessThan(32), 'First name is too long.');

  validate(vals.last_name, v.required, 'Last name is required.');
  validate(vals.last_name, v.isString, 'Last name does not have the correct format.');
  validate(vals.last_name, v.usesLegalLetters, 'Last name contains invalid characters.');
  validate(vals.last_name, v.lessThan(32), 'Last name is too long.');

  validate(vals.email, v.required, 'Email is required.');
  validate(vals.email, v.isString, 'Email does not have the correct format.');
  validate(vals.email, v.email, 'Email is invalid.');
  validate(vals.email, v.lessThan(255), 'Email is too long.');

  // Validate other required values
  validate(vals.stripe_token_id, v.required, 'Stripe token is required.');
  validate(vals.stripe_token_id, v.required, 'Stripe token id is required.');
  validate(vals.stripe_token_id, v.isString, 'Stripe token id is invalid.');

  validate(vals.cents_charged_total, v.required, 'Total cost is required.');
  validate(vals.cents_charged_total, v.isNumGt0, 'Total cost must be a number greater than zero.');

  validate(vals.cents_charged_shipping, v.isNum, 'Shipping cost must be a positive number.');

  // Validate that the cart is valid
  validate(vals.cart, v.requiredArray, 'Cart is not valid.');
  vals.cart.forEach((item) => {
    validate(item.id, v.isNumGt0, 'A cart item does not have a valid id.');
  });

  // Validate that the cart items exist in the database
  const productIds = vals.cart.map((item) => item.id );
  const savedProducts = await client.query(`
    SELECT
      id,
      slug,
      grams,
      cents,
      name
    FROM products
    WHERE id IN (${productIds.join(', ')});
  `);
  vals.cart.forEach((item) => {
    const savedProduct = savedProducts.rows.find((savedProduct) => {
      return savedProduct.id === item.id;
    })
    if (!savedProduct) {
      throw 'A cart item does not exist in the database.';
    }
    if ((savedProduct.slug !== item.slug) ||
        (savedProduct.grams !== item.grams) ||
        (savedProduct.cents !== item.cents) ||
        (savedProduct.name !== item.name)) {
      throw 'A cart item\'s data does not match the item in the database.';
    }
  });

  vals.cart.forEach((item) => {
    // Validate that items of zero weight don't occur more than once
    if (item.grams === 0) {
      const itemsOfSameType = vals.cart.filter((otherItem) => {
        return otherItem.id === item.id;
      });
      if (itemsOfSameType.length > 1) {
        throw 'You can\'t purchase a digital item more than once.';
      }
    }

    // Validate that we're charging for items correctly
    validate(item.cents_charged, v.isNumGt0, 'Cart items need to cost more than $0.');
    if (!!item.cents && (item.cents !== item.cents_charged)) {
      throw 'Item is being charged for incorrectly.';
    }
  });

  // If shipping is required, validate shipping values
  const weight = vals.cart.reduce((accumulator, currentVal) => {
    return accumulator + currentVal.grams;
  }, 0);
  if (weight > 0) {
    if (['orangeville', 'waterloo', 'mail'].indexOf(vals.pickup_location) === -1) {
      throw 'Pickup location required.';
    }
    if (vals.pickup_location === 'mail') {
      // Validate shipping costs
      if ([150, 300, 450, 600].indexOf(weight) === -1) {
        throw 'Invalid total weight.';
      }
      const envelopeCost = 100;
      const shippingFor100To200Grams = Math.ceil(295 * 1.13);
      const shippingFor300To400Grams = Math.ceil(470 * 1.13);
      let expectedShippingCost;
      if (weight === 150) {
        expectedShippingCost = envelopeCost + shippingFor100To200Grams;
      } else if (weight === 300) {
        expectedShippingCost = envelopeCost + shippingFor300To400Grams;
      } else if (weight === 450) {
        expectedShippingCost = (2 * envelopeCost) + shippingFor100To200Grams + shippingFor300To400Grams;
      } else if (weight === 600) {
        expectedShippingCost = (2 * envelopeCost) + (2 * shippingFor300To400Grams);
      }
      if (vals.cents_charged_shipping !== expectedShippingCost) {
        throw 'Invalid shipping cost.';
      }

      // Validate address fields
      validate(vals.address_line_1, v.required, 'Address is required.');
      validate(vals.address_line_1, v.isString, 'Address does not have the correct format.');
      validate(vals.address_line_1, v.usesLegalLettersOrNumbers, 'Address contains invalid characters.');
      validate(vals.address_line_1, v.lessThan(255), 'Address is too long.');

      validate(vals.city, v.required, 'City is required.');
      validate(vals.city, v.isString, 'City does not have the correct format.');
      validate(vals.city, v.usesLegalLettersOrNumbers, 'City contains invalid characters.');
      validate(vals.city, v.lessThan(32), 'City is too long.');

      if (['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'].indexOf(vals.province) === -1) {
        throw 'Province is invalid.';
      }

      validate(vals.postal_code, v.required, 'Postal code is required.');
      validate(vals.postal_code, v.postalCode, 'Postal code is invalid.');
    }
  }

  // Validate total cost
  const totalItemCost = vals.cart.reduce((accumulator, currentVal) => {
    return accumulator + currentVal.cents_charged;
  }, 0);
  let promoCodeAmountOff = 0;
  if (promoCode) {
    const percentOff = promoCode.percent_off / 100;
    if (promoCode.product_slug) {
      const product = vals.cart.find((obj) => obj.slug === promoCode.product_slug);
      if (product) {
        promoCodeAmountOff = Math.floor(product.cents * percentOff);
      }
    } else {
      const donation = vals.cart.find((obj) => obj.slug === 'donation');
      const totalItemCostWithoutDonations = totalItemCost - (donation ? donation.cents_charged : 0);
      promoCodeAmountOff = Math.floor(totalItemCostWithoutDonations * percentOff);
    }
  }
  if (vals.cents_charged_total !== (vals.cents_charged_shipping + totalItemCost - promoCodeAmountOff)) {
    let error = 'Total cost does not match the cost of the cart items';
    if (promoCodeAmountOff) {
      error += ' plus discount';
    }
    if (vals.cents_charged_shipping) {
      error += ' plus shipping';
    }
    error += '.';
    throw error;
  }
};

const validate = (val, validationFn, errorMessage) => {
  const isValid = validationFn(val);
  if (!isValid) {
    throw errorMessage;
  }
};

const v = {
  email: (val) => {
    return val && val.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  },
  isNum: (val) => {
    return (typeof(val) === 'number') && (val >= 0);
  },
  isNumGt0: (val) => {
    return val > 0;
  },
  isString: (val) => {
    return typeof(val) === 'string';
  },
  lessThan: (length) => {
    return function(val) {
      return val && val.length < length;
    };
  },
  postalCode: (val) => {
    return val ? !!val.toUpperCase().match(/^[A-Z]\d[A-Z][ ]*\d[A-Z]\d\s*$/gm) : false;
  },
  required: (val) => {
    return !!val;
  },
  requiredArray: (val) => {
    return val && (val.constructor === Array) && !!val.length;
  },
  usesLegalLetters: (val) => {
    return val && val.match(/^([a-zA-Z]+[\., ]*)+$/);
  },
  usesLegalLettersOrNumbers: (val) => {
    return val && val.match(/^(#*[a-zA-Z\d]+[\.,: ]*)+$/);
  }
};

module.exports = router;
