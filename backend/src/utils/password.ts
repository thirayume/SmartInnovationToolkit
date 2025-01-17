// backend/src/utils/password.ts
import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcryptjs.hash(password, saltRounds);
};

export const verifyPassword = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};