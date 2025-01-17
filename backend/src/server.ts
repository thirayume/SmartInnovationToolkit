// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { logger } from './utils/logger';
import { requestLogger } from './middleware/logging.middleware';
import { errorHandler } from './middleware/error.middleware';
import pool from './utils/db';
import placeholderRoutes from './routes/placeholder.routes';

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['https://localhost:3000'];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`Blocked request from unauthorized origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  optionsSuccessStatus: 200
};

// Apply CORS configuration
app.use(cors(corsOptions));

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/placeholder', placeholderRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

const PORT = process.env.PORT || 8000;

// Create HTTPS server
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '../../certificates/localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../certificates/localhost.pem'))
};

const server = https.createServer(sslOptions, app);

server.listen(PORT, () => {
  logger.info(`⚡️[server]: Secure server running at https://localhost:${PORT}`);
  logger.info('Available routes:');
  logger.info('  - GET /');
  logger.info('  - POST /api/auth/register');
  logger.info('  - GET /api/placeholder/:width/:height');
});

app.use(errorHandler);

async function healthCheck() {
  try {
    await pool.query('SELECT 1');
  } catch (error) {
    console.error('Database health check failed:', error);
  }
}

// Start health check after app initialization
setInterval(healthCheck, 5 * 60 * 1000);

export default app;