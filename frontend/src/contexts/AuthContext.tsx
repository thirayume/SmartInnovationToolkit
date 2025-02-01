// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/models';
import { UserService } from '../services/mockService';
import api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            
            // Ensure all required fields are present with their original values or defaults
            const userWithDefaults: User = {
              ...parsedUser,
              userId: parsedUser.userId,
              email: parsedUser.email,
              title: parsedUser.title || '',
              firstName: parsedUser.firstName || '',
              lastName: parsedUser.lastName || '',
              phone: parsedUser.phone || '',
              institution: parsedUser.institution || '',
              province: parsedUser.province || '',
              emailVerified: parsedUser.emailVerified || false,
              adminVerified: parsedUser.adminVerified || false,
              emailVerifiedAt: parsedUser.emailVerifiedAt ? new Date(parsedUser.emailVerifiedAt) : null,
              adminVerifiedAt: parsedUser.adminVerifiedAt ? new Date(parsedUser.adminVerifiedAt) : null,
              isActive: parsedUser.isActive || false,
              createdAt: new Date(parsedUser.createdAt),
              updatedAt: new Date(parsedUser.updatedAt),
              createdByUserId: parsedUser.createdByUserId,
              updatedByUserId: parsedUser.updatedByUserId,
              roles: parsedUser.roles || []
            };

            setUser(userWithDefaults);
            setIsAuthenticated(true);
          } catch (error) {
            // Clear invalid data
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        // Handle initialization error silently
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  // Don't render anything until the auth is initialized
  if (!isInitialized) {
    return null;
  }

  const login = async (email: string, password: string) => {
    try {
      // First authenticate with the API
      const response = await api.auth.login({ email, password });
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Authentication failed');
      }

      const token = response.data.token;

      // After successful API authentication, get user data from mock
      const mockUser = await UserService.getUserByEmail(email);
      
      if (!mockUser) {
        throw new Error('User data not found');
      }

      // Ensure all fields are present before storing
      const userDataWithDefaults: User = {
        ...mockUser,
        title: mockUser.title || '',
        firstName: mockUser.firstName || '',
        lastName: mockUser.lastName || '',
        phone: mockUser.phone || '',
        institution: mockUser.institution || '',
        province: mockUser.province || '',
        emailVerified: mockUser.emailVerified || false,
        adminVerified: mockUser.adminVerified || false,
        emailVerifiedAt: mockUser.emailVerifiedAt,
        adminVerifiedAt: mockUser.adminVerifiedAt,
        isActive: mockUser.isActive || false,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        createdByUserId: mockUser.createdByUserId,
        updatedByUserId: mockUser.updatedByUserId,
        roles: mockUser.roles || []
      };
    
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userDataWithDefaults));
      setUser(userDataWithDefaults);
      setIsAuthenticated(true);
    } catch (error) {
      // Handle login error silently and rethrow
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      isLoading,
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};