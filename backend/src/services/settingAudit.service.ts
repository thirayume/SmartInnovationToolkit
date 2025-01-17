// backend/src/services/settingAudit.service.ts
import { RowDataPacket } from 'mysql2';
import pool from '../utils/db';
import { SettingAudit } from '../models/settingAudit.model';
import { logger } from '../utils/logger';

export class SettingAuditService {
  async logChange(
    settingId: number,
    oldValue: string | null,
    newValue: string,
    userId: number,
    action: 'UPDATE' | 'CREATE' | 'DELETE'
  ): Promise<void> {
    try {
      await pool.execute(
        `INSERT INTO setting_audits (
          setting_id, old_value, new_value, changed_by_user_id, action
        ) VALUES (?, ?, ?, ?, ?)`,
        [settingId, oldValue, newValue, userId, action]
      );
    } catch (error) {
      logger.error('Error logging setting change:', error);
      throw error;
    }
  }

  async getAuditLog(settingId?: number): Promise<SettingAudit[]> {
    try {
      let query = `
        SELECT sa.*, s.key_name, u.first_name, u.last_name
        FROM setting_audits sa
        JOIN settings s ON sa.setting_id = s.setting_id
        JOIN users u ON sa.changed_by_user_id = u.user_id
        ${settingId ? 'WHERE sa.setting_id = ?' : ''}
        ORDER BY sa.changed_at DESC
      `;

      const [rows] = await pool.execute<RowDataPacket[]>(
        query,
        settingId ? [settingId] : []
      );

      return rows as SettingAudit[];
    } catch (error) {
      logger.error('Error fetching audit log:', error);
      throw error;
    }
  }
}