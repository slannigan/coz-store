const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/products', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM products');
    const results = { 'products': (result) ? result.rows : null};
    client.release();
    res.send(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
