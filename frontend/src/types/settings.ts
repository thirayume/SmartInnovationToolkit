// src/types/settings.ts
export interface ApplicationSetting {
	setting_id: number;
	key_name: string;
	value: string;
	description: string | null;
	updated_at: string | null;
	updated_by_user_id: number | null;
}

export interface SettingUpdate {
	value: string;
	description?: string;
}

export interface SettingAudit {
	audit_id: number;
	setting_id: number;
	old_value: string;
	new_value: string;
	changed_by_user_id: number;
	changed_by_name: string;
	changed_at: string;
	key_name: string;
}