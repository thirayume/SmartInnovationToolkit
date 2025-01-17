// backend/src/models/settings.model.ts
export interface ApplicationSetting {
	setting_id: number;
	key_name: string;
	value: string;
	description: string | null;
	updated_at: Date | null;
	updated_by_user_id: number | null;
      }
      
      export interface UpdateSettingDTO {
	value: string;
	description?: string;
	updated_by_user_id: number;
      }