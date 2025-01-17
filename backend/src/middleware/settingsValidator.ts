// backend/src/middleware/settingsValidator.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';

// Define validation schemas for different setting types
const settingValidators = {
  site_name: z.string().min(1).max(100),
  support_email: z.string().email(),
  max_login_attempts: z.string().regex(/^\d+$/).transform(Number),
  lockout_duration: z.string().regex(/^\d+$/).transform(Number),
  email_verification_enabled: z.string().transform(val => val === 'true'),
  admin_approval_enabled: z.string().transform(val => val === 'true'),
  default_role: z.string().min(1),
};

export const validateSettingUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { key_name, value } = req.body;
  
  try {
    if (!key_name || !value) {
      return res.status(400).json({ error: 'Key and value are required' });
    }

    const validator = settingValidators[key_name as keyof typeof settingValidators];
    if (validator) {
      validator.parse(value);
    }

    next();
  } catch (error) {
    logger.error('Setting validation error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid value for setting',
        details: error.errors 
      });
    }
    return res.status(400).json({ error: 'Invalid setting value' });
  }
};