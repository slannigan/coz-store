const express = require('express');
const { Pool } = require('pg');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.post('/transactions', async (req, res) => {
  const amount = req.body.cents_charged_total;
  const cart = req.body.cart;
  const token = req.body.stripe_token.id;
  let charge;
  let client;
  let transactionId;

  try {
    client = await pool.connect();
    await client.query('BEGIN');
    const transaction = await client.query(`
      INSERT INTO
        transactions(
          first_name,
          last_name,
          email,
          cents_charged_total
        )
        VALUES (
          'Sarah',
          'Gault',
          'sarah.lannigan@gmail.com',
          ${amount}
        )
        RETURNING id
    `);
    transactionId = transaction.rows[0].id;
    let purchasedItems = [];
    // TODO: get cost of each product from db
    // TODO: verify charge from front end equals charge calculated from db
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      purchasedItems.push(`(${transactionId}, ${item.id}, ${item.cents})`);
    }
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
      source: token
    });
    await client.query('COMMIT');
  } catch (e) {
    if (client) {
      await client.query('ROLLBACK');
      client.release();
    }
    res.sendStatus(422);
    throw e;
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
});

module.exports = router;
