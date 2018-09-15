const express = require('express');
// const { Pool } = require('pg');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

router.post('/transactions', (req, res) => {
  const amount = req.body.cents_charged_total;
  const token = req.body.stripe_token.id;
  const charge = stripe.charges.create({
    amount,
    currency: 'cad',
    description: 'Example charge',
    source: token,
  }).then(() => {
    res.sendStatus(201);
  }).catch((err) => {
    console.log(err)
  });
});

module.exports = router;
