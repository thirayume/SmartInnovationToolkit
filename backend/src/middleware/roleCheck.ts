// backend/src/middleware/roleCheck.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = req.user?.role;
    if (userRole !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Super admin rights required.' });
    }
    next();
  } catch (error) {
    logger.error('Role check error:', error);
    res.status(500).json({ error: 'Error checking permissions' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = req.user?.role;
    if (!['super_admin', 'admin'].includes(userRole || '')) {
      return res.status(403).json({ error: 'Access denied. Admin rights required.' });
    }
    next();
  } catch (error) {
    logger.error('Role check error:', error);
    res.status(500).json({ error: 'Error checking permissions' });
  }
};