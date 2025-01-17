// backend/src/routes/settings.routes.ts
import express from 'express';
import { getSettings, updateSetting, getAuditLog } from '../controllers/settings.controller';
import { validateSettingUpdate } from '../middleware/settingsValidator';
import { authenticate } from '../middleware/auth.middleware';
import { isAdmin, isSuperAdmin } from '../middleware/roleCheck';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get settings (admin access)
router.get('/', isAdmin, getSettings);

// Update setting (super admin only)
router.put('/:key_name', 
  isSuperAdmin,
  validateSettingUpdate,
  updateSetting
);

// Get audit log (admin access)
router.get('/audit', isAdmin, getAuditLog);

export const settingsRoutes = router;