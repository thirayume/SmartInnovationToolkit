import { ResultSetHeader } from 'mysql2';
import pool from '../utils/db';
import { CreateUserDTO, User } from '../models/user.model';
import { hashPassword } from '../utils/password';
import { logger } from '../utils/logger';

export class UserService {
  async createUser(userData: CreateUserDTO): Promise<number> {
    const connection = await pool.getConnection();
    logger.info('Starting user creation process for:', userData.email);

    try {
      await connection.beginTransaction();

      const hashedPassword = await hashPassword(userData.password);

      // Insert user
      const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO users (
          email, password, title, first_name, last_name, phone,
          email_verified, admin_verified, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userData.email,
          hashedPassword,
          userData.title,
          userData.first_name,
          userData.last_name,
          userData.phone,
          false, // email_verified
          false, // admin_verified
          true   // is_active
        ]
      );

      const userId = result.insertId;
      logger.info(`User inserted with ID: ${userId}`);

      // Get default role (teacher)
      const [roles] = await connection.execute<User[]>(
        'SELECT role_id FROM roles WHERE name = ? LIMIT 1',
        ['teacher']
      );

      if (roles.length > 0) {
        // Assign default role
        await connection.execute(
          'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
          [userId, roles[0].role_id]
        );
        logger.info(`Default role assigned to user ${userId}`);
      }

      await connection.commit();
      logger.info(`User creation completed successfully for ID: ${userId}`);

      return userId;
    } catch (error) {
      await connection.rollback();
      logger.error('Error in user creation:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async findByEmail(email: string, retries = 3): Promise<User | null> {
    try {
      logger.info('Searching for user by email: ${email}');

      const [users] = await pool.execute<User[]>(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
      );

      if (users.length > 0) {
        logger.info(`User found with email: ${email}`);
      } else {
        logger.info(`No user found with email: ${email}`);
      }

      // Add logging to debug
      console.log('DB Response:', users);
      
      // Return first user from array
      return users[0] || null;
    } catch (error) {
      if ((error as any).code === 'ECONNRESET' && retries > 0) {
        // Wait for 100ms before retry
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.findByEmail(email, retries - 1);
      }
      throw error;
    }

    return null;
  }
}