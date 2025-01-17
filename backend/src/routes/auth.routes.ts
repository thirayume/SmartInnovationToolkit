// backend/src/routes/auth.routes.ts
import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { logger } from '../utils/logger';

const router = express.Router();

// Add middleware to log request details
router.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    body: req.method === 'POST' ? { ...req.body, password: '[REDACTED]' } : {},
    query: req.query,
    headers: req.headers
  });
  next();
});

// Register route
router.post('/register', async (req, res) => {
  try {
    await register(req, res);
  } catch (error) {
    logger.error('Registration route error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    logger.error('Login route error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export const authRoutes = router;