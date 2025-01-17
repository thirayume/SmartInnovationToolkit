// backend/src/middleware/logging.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    body: req.method === 'POST' ? { ...req.body, password: '[REDACTED]' } : undefined,
    query: req.query,
    headers: req.headers
  });

  // Capture response
  const originalJson = res.json;
  res.json = function(body) {
    logger.info('Response:', { 
      status: res.statusCode,
      body: body
    });
    return originalJson.call(this, body);
  };

  next();
};