import { RowDataPacket } from 'mysql2';

export interface User extends RowDataPacket {
  user_id: number;
  email: string;
  password: string;
  title: string;
  first_name: string;
  last_name: string;
  phone: string;
  email_verified: boolean;
  admin_verified: boolean;
  email_verified_at: Date | null;
  admin_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  title: string;
  first_name: string;
  last_name: string;
  phone: string;
}