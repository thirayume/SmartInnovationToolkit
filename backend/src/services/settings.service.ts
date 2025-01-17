// backend/src/services/settings.service.ts
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../utils/db';
import { ApplicationSetting, UpdateSettingDTO } from '../models/settings.model';
import { logger } from '../utils/logger';

export class SettingsService {
  async getAllSettings(): Promise<ApplicationSetting[]> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM settings ORDER BY key_name'
      );
      return rows as ApplicationSetting[];
    } catch (error) {
      logger.error('Error fetching settings:', error);
      throw error;
    }
  }

  async getSettingByKey(keyName: string): Promise<ApplicationSetting | null> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM settings WHERE key_name = ?',
        [keyName]
      );
      return rows.length > 0 ? rows[0] as ApplicationSetting : null;
    } catch (error) {
      logger.error('Error fetching setting:', error);
      throw error;
    }
  }

  async updateSetting(keyName: string, data: UpdateSettingDTO): Promise<void> {
    try {
      await pool.execute(
        `UPDATE settings 
         SET value = ?, 
             description = COALESCE(?, description),
             updated_at = CURRENT_TIMESTAMP,
             updated_by_user_id = ?
         WHERE key_name = ?`,
        [data.value, data.description, data.updated_by_user_id, keyName]
      );
    } catch (error) {
      logger.error('Error updating setting:', error);
      throw error;
    }
  }

  async createSetting(
    keyName: string, 
    value: string, 
    description: string | null,
    userId: number
  ): Promise<ApplicationSetting> {
    try {
      const [result] = await pool.execute<ResultSetHeader>(
        `INSERT INTO settings (key_name, value, description, updated_by_user_id)
         VALUES (?, ?, ?, ?)`,
        [keyName, value, description, userId]
      );

      return this.getSettingByKey(keyName) as Promise<ApplicationSetting>;
    } catch (error) {
      logger.error('Error creating setting:', error);
      throw error;
    }
  }

  async deleteSetting(keyName: string): Promise<void> {
    try {
      await pool.execute(
        'DELETE FROM settings WHERE key_name = ?',
        [keyName]
      );
    } catch (error) {
      logger.error('Error deleting setting:', error);
      throw error;
    }
  }
}