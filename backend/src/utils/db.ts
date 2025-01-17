// backend/src/utils/db.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  enableKeepAlive: true,      // Enable keep-alive
  keepAliveInitialDelay: 0,   // Start keep-alive immediately
  waitForConnections: true,   // Queue queries when all connections are used
  connectTimeout: 10000,      // Connection timeout
});

// Test database connection
pool.getConnection()
  .then(connection => {
    logger.info('Database connection established successfully');
    connection.release();
  })
  .catch(err => {
    logger.error('Error connecting to database:', err);
  });

export default pool;