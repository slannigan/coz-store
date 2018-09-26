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
  const amount = req.body.cents_charged_total;
  const cart = req.body.cart;
  let charge;
  let client;
  let transactionId;

  try {
    client = await pool.connect();
    await validateTransaction(req.body, client);
    await client.query('BEGIN');
    const transaction = await client.query(`
      INSERT INTO
        transactions(
          first_name,
          last_name,
          email,
          address_line_1,
          address_line_2,
          city,
          province,
          postal_code,
          stripe_charge_id,
          cents_charged_shipping,
          cents_charged_total
        )
        VALUES (
          '${req.body.first_name.trim()}',
          '${req.body.last_name.trim()}',
          '${req.body.email.trim()}',
          '${(req.body.address_line_1 || '').trim()}',
          '${(req.body.address_line_2 || '').trim()}',
          '${(req.body.city || '').trim()}',
          '${(req.body.province || '')}',
          '${(req.body.postal_code || '').toUpperCase().trim()}',
          '${req.body.stripe_token.id}',
          ${req.body.cents_charged_shipping},
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
    charge = await stripe.charges.create({
      amount,
      currency: 'cad',
      description: 'Example charge',
      receipt_email: req.body.email,
      source: req.body.stripe_token.id
    });
    // TODO: charge.outcome.risk_level === 'elevated' - should mark this in DB
    await client.query('COMMIT');
  } catch (e) {
    if (client) {
      await client.query('ROLLBACK');
      client.release();
    }
    return res.status(e.statusCode || 422).send(e.message || e);
  }

  try {
    await client.query(`
      UPDATE transactions
        SET stripe_charge_id = '${charge.id}'
        WHERE id = ${transactionId}
    `);
  } catch (e) {
    console.log('ERROR assigning charge id', charge.id, 'to transaction', transactionId);
  } finally {
    client.release();
    res.sendStatus(201);
  }
}));

const validateTransaction = async (vals, client) => {
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
  validate(vals.stripe_token, v.required, 'Stripe token is required.');
  validate(vals.stripe_token.id, v.required, 'Stripe token id is required.');
  validate(vals.stripe_token.id, v.isString, 'Stripe token id is invalid.');

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
      cents
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
        (savedProduct.cents !== item.cents)) {
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
      validate(vals.address_line_1, v.required, 'Address line 1 is required.');
      validate(vals.address_line_1, v.isString, 'Address line 1 does not have the correct format.');
      validate(vals.address_line_1, v.usesLegalLettersOrNumbers, 'Address line 1 contains invalid characters.');
      validate(vals.address_line_1, v.lessThan(255), 'Address line 1 is too long.');

      if (vals.address_line_2) {
        validate(vals.address_line_2, v.isString, 'Address line 2 does not have the correct format.');
        validate(vals.address_line_2, v.usesLegalLettersOrNumbers, 'Address line 2 contains invalid characters.');
        validate(vals.address_line_2, v.lessThan(255), 'Address line 2 is too long.');
      }

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
  if (vals.cents_charged_total !== (vals.cents_charged_shipping + totalItemCost)) {
    throw 'Total cost does not match the cost of the cart items plus shipping plus donation.';
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
