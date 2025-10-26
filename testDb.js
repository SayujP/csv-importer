require('dotenv').config();
const { pool } = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected! Current time:', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  }
})();
