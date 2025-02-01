// frontend/src/services/api.ts
import { toast } from 'react-hot-toast';
import apiConfig from '../config/apiConfig';
import mockDataService from './mockDataService';
import { ClassStudent } from '../types/models';

// Type definitions
export interface RegisterData {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  province: string;
  institution: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface User {
  id: number;
  userId: number;
  username: string;
  email: string;
  roles: string[];
  isActive: boolean;
  lastLogin: string;
  title?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  institution?: string;
  province?: string;
  createdByUserId?: number;
}

export interface UserFormData {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  institution: string;
  province: string;
  role?: string;
  password?: string;
  confirmPassword?: string;
}

export interface SettingUpdate {
  value: string;
  description?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface ProfileData {
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  institution: string;
  province: string;
}

// API error handler
const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  if (error.response) {
    return error.response.data.error || 'An error occurred';
  }
  return error.message || 'Network error occurred';
};

class ApiService {
  private baseUrl = apiConfig.getConfig().apiUrl;
  private mockService = mockDataService;

  private request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const useMockData = localStorage.getItem('useMockData') === 'true';
    
    if (useMockData) {
      // Handle mock data requests
      if (endpoint.startsWith('/api/profile')) {
        if (options.method === 'POST') {
          const data = JSON.parse(options.body as string);
          return this.mockService.profile.updateProfile(data) as T;
        } else {
          return this.mockService.profile.getProfile() as T;
        }
      }
      // Add other mock endpoints as needed
      throw new Error('Mock endpoint not implemented');
    }

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const defaultHeaders = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  };

  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
  }

  public auth = {
    register: async (data: RegisterData): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            title: data.title,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            confirm_password: data.confirm_password,
            province: data.province,
            institution: data.institution
          })
        });

        if (!response.success) {
          throw new Error(response.error || 'Registration failed');
        }

        return response;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },

    login: async (data: LoginData): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(data)
        });

        if (!response.success) {
          const error = response.error || 'Login failed';
          throw new Error(error);
        }

        return response;
      } catch (error) {
        throw error;
      }
    },

    logout: async (): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.success) {
          throw new Error('Logout failed');
        }

        localStorage.removeItem('token');
        localStorage.removeItem('userData');

        return response;
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },

    forgotPassword: async (data: ForgotPasswordData): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>('/api/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        if (!response.success) {
          throw new Error(response.error || 'Password reset request failed');
        }

        return response;
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
        throw error;
      }
    },

    verifyEmail: async (token: string): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>(`/api/auth/verify-email/${token}`);

        if (!response.success) {
          throw new Error(response.error || 'Email verification failed');
        }

        return response;
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
        throw error;
      }
    }
  };

  public users = {
    getAll: async (): Promise<ApiResponse<User[]>> => {
      try {
        const response = await this.request<ApiResponse<User[]>>('/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.success) {
          throw new Error('Failed to fetch users');
        }

        return response;
      } catch (error) {
        console.error('Fetch users error:', error);
        throw error;
      }
    },

    create: async (data: UserFormData): Promise<ApiResponse<User>> => {
      try {
        const response = await this.request<ApiResponse<User>>('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data)
        });

        if (!response.success) {
          throw new Error('Failed to create user');
        }

        return response;
      } catch (error) {
        console.error('Create user error:', error);
        throw error;
      }
    },

    update: async (userId: number, data: UserFormData): Promise<ApiResponse<User>> => {
      try {
        const response = await this.request<ApiResponse<User>>(`/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data)
        });

        if (!response.success) {
          throw new Error('Failed to update user');
        }

        return response;
      } catch (error) {
        console.error('Update user error:', error);
        throw error;
      }
    },

    toggleStatus: async (userId: number): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>(`/api/users/${userId}/toggle-status`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.success) {
          throw new Error('Failed to toggle user status');
        }

        return response;
      } catch (error) {
        console.error('Toggle status error:', error);
        throw error;
      }
    },

    unverifyEmail: async (userId: number): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>(`/api/users/${userId}/unverify-email`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!response.success) {
          throw new Error('Failed to unverify email');
        }
  
        return response;
      } catch (error) {
        console.error('Email unverification error:', error);
        throw error;
      }
    },
  
    unverifyAdmin: async (userId: number): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>(`/api/users/${userId}/unverify-admin`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!response.success) {
          throw new Error('Failed to unverify admin');
        }
  
        return response;
      } catch (error) {
        console.error('Admin unverification error:', error);
        throw error;
      }
    }
  };

  public classStudent = {
    getByClassId: async (classId: number): Promise<ApiResponse<ClassStudent[]>> => {
      try {
        const response = await this.request<ApiResponse<ClassStudent[]>>(`/api/class-students/class/${classId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.success) {
          throw new Error('Failed to fetch class students');
        }

        return response;
      } catch (error) {
        console.error('Fetch class students error:', error);
        throw error;
      }
    },

    getByStudentId: async (studentId: number): Promise<ApiResponse<ClassStudent[]>> => {
      try {
        const response = await this.request<ApiResponse<ClassStudent[]>>(`/api/class-students/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.success) {
          throw new Error('Failed to fetch student classes');
        }

        return response;
      } catch (error) {
        console.error('Fetch student classes error:', error);
        throw error;
      }
    }
  };

  public settings = {
    getAll: async (): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>('/api/settings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.success) {
          throw new Error('Failed to fetch settings');
        }

        return response;
      } catch (error) {
        console.error('Settings fetch error:', error);
        throw error;
      }
    },

    update: async (keyName: string, data: SettingUpdate): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>(`/api/settings/${keyName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        });

        if (!response.success) {
          throw new Error('Failed to update setting');
        }

        return response;
      } catch (error) {
        console.error('Setting update error:', error);
        throw error;
      }
    },

    getAuditLog: async (): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>('/api/settings/audit', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.success) {
          throw new Error('Failed to fetch audit log');
        }

        return response;
      } catch (error) {
        console.error('Audit log fetch error:', error);
        throw error;
      }
    }
  };

  public profile = {
    get: async (): Promise<ApiResponse> => {
      try {
        const useMockData = localStorage.getItem('useMockData') === 'true';
        if (useMockData) {
          const currentUser = localStorage.getItem('user');
          if (!currentUser) throw new Error('No user found');
          
          return {
            success: true,
            data: JSON.parse(currentUser)
          };
        }

        const response = await this.request<ApiResponse>('/api/profile', {
          method: 'GET',
          headers: {
            Authorization: this.getAuthHeader()
          },
        });

        if (!response.success) {
          throw new Error('Failed to get profile');
        }

        return response;
      } catch (error) {
        return {
          success: false,
          error: handleApiError(error)
        };
      }
    },

    update: async (data: ProfileData): Promise<ApiResponse> => {
      try {
        const response = await this.request<ApiResponse>('/api/profile', {
          method: 'POST',
          headers: {
            Authorization: this.getAuthHeader(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        
        if (!response.success) {
          throw new Error(response.error || 'Failed to update profile');
        }
        
        return response;
      } catch (error) {
        console.error('API Error:', error);
        return {
          success: false,
          error: handleApiError(error)
        };
      }
    }
  };

  public async checkHealth(): Promise<boolean> {
    try {
      const response = await this.request<ApiResponse>('/api/health');
      return response.success;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export default new ApiService();