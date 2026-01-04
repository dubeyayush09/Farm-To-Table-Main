const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool for better performance and resource management
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: "17124",
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Aiven requires SSL by default
  },
  // Pool configuration - using only valid MySQL2 options
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

// Keep the setupConnection function for backward compatibility but make it return the pool
async function setupConnection() {
    try {
        // Test the pool connection
        const connection = await pool.getConnection();
        console.log('The MySQL database pool is connected');
        connection.release(); // Release the connection back to the pool
        return pool;
    } catch (err) {
        console.error('An error occurred while connecting to MySQL pool:', err);
        throw err;
    }
}

module.exports = { setupConnection, pool };
