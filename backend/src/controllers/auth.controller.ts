// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyPassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

const userService = new UserService();

export const register = async (req: Request, res: Response) => {
  try {
    logger.info('Processing registration request');

    if (!req.body) {
      logger.error('No request body received');
      return res.status(400).json({
        success: false,
        error: 'No data provided'
      });
    }

    // Log the received data
    logger.info('Received registration data:', {
      ...req.body,
      password: '[REDACTED]'
    });

    // Create user
    const userId = await userService.createUser(req.body);
    logger.info(`User created successfully with ID: ${userId}`);

    // Send success response
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { userId }
    });

  } catch (error) {
    logger.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    logger.info('Login attempt for email:', req.body.email);

    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      logger.warn('Missing email or password');
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user
    const user = await userService.findByEmail(email);
    console.log('User object:', user); // Add this debug log
    if (!user) {
      logger.warn(`Login failed: No user found with email ${email}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      logger.warn(`Login failed: Invalid password for ${email}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is verified if needed
    if (!user.email_verified || !user.admin_verified) {
      logger.warn(`Login failed: User ${email} not fully verified`);
      return res.status(403).json({
        success: false,
        error: 'Account not verified'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    logger.info(`User logged in successfully: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }
      }
    });

  } catch (error) {
    logger.error('Login error:', error);

    // Specific error handling
    if ((error as any).code === 'ECONNRESET') {
      return res.status(503).json({
        success: false,
        error: 'Service temporarily unavailable, please try again'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
};