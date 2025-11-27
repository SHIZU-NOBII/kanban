const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool of connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
});

// Test the database connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database');
    client.release();
    return true;
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
    return false;
  }
}

// Export the pool and test function
module.exports = {
  query: (text, params) => pool.query(text, params),
  testConnection
};
