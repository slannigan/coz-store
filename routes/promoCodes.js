const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/promo_codes/:id', async (req, res) => {
  try {
    const code = req.params.id.toLowerCase();
    const client = await pool.connect()
    const result = await client.query(`
      SELECT
        code,
        product_slug,
        percent_off
      FROM promo_codes
        WHERE code = '${code}'
        AND expired_at IS NULL
    `);
    client.release();
    const promoCode = (result && result.rows && result.rows[0]) ? result.rows[0] : null;
    res.send(promoCode);
  } catch (err) {
    console.error(`Unexpected error in GET/promo_codes/${req.params.id}. Error:`, err);
    res.sendStatus(422);
  }
});

module.exports = router;
