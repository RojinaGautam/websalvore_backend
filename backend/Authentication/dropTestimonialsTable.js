import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function dropTable() {
  try {
    await pool.query('DROP TABLE IF EXISTS "Testimonials" CASCADE;');
    console.log('Table "Testimonials" dropped successfully.');
  } catch (err) {
    console.error('Error dropping table:', err);
  } finally {
    await pool.end();
  }
}

dropTable(); 