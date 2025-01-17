export interface SettingAudit {
	audit_id: number;
	setting_id: number;
	old_value: string;
	new_value: string;
	changed_by_user_id: number;
	changed_at: Date;
	action: 'UPDATE' | 'CREATE' | 'DELETE';
      }