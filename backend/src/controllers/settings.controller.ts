// backend/src/controllers/settings.controller.ts
import { Request, Response } from 'express';
import { SettingsService } from '../services/settings.service';
import { SettingAuditService } from '../services/settingAudit.service';
import { logger } from '../utils/logger';

const settingsService = new SettingsService();
const auditService = new SettingAuditService();

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await settingsService.getAllSettings();
    res.json(settings);
  } catch (error) {
    logger.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

export const updateSetting = async (req: Request, res: Response) => {
  try {
    const { key_name, value, description } = req.body;
    const userId = req.user?.user_id;

    const oldSetting = await settingsService.getSettingByKey(key_name);
    if (!oldSetting) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    await settingsService.updateSetting(key_name, {
      value,
      description,
      updated_by_user_id: userId!
    });

    // Log the change
    await auditService.logChange(
      oldSetting.setting_id,
      oldSetting.value,
      value,
      userId!,
      'UPDATE'
    );

    res.json({ message: 'Setting updated successfully' });
  } catch (error) {
    logger.error('Error updating setting:', error);
    res.status(500).json({ error: 'Failed to update setting' });
  }
};

export const getAuditLog = async (req: Request, res: Response) => {
  try {
    const { settingId } = req.query;
    const auditLog = await auditService.getAuditLog(
      settingId ? Number(settingId) : undefined
    );
    res.json(auditLog);
  } catch (error) {
    logger.error('Error fetching audit log:', error);
    res.status(500).json({ error: 'Failed to fetch audit log' });
  }
};