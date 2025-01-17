// src/services/mockDataService.ts
import { userData as initialUserData } from '../mockData/userData';
import { User } from '../types';

const MOCK_DATA_KEY = 'mockUserData';

// Add type for snake_case user data
interface SnakeCaseUser {
  first_name?: string;
  last_name?: string;
}

class MockDataService {
  private static instance: MockDataService;
  private userData: User[];

  private constructor() {
    this.userData = this.loadData();
  }

  private loadData(): User[] {
    try {
      const savedData = localStorage.getItem(MOCK_DATA_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData, (key, value) => {
          // Convert date strings back to Date objects
          if (key.toLowerCase().includes('at') && typeof value === 'string') {
            return new Date(value);
          }
          return value;
        });
        // Validate the data structure
        if (Array.isArray(parsedData) && parsedData.length > 0 && 'id' in parsedData[0]) {
          return parsedData;
        }
      }
      // If no valid data in localStorage, use initial data
      return [...initialUserData];
    } catch (error) {
      console.error('Error loading mock data:', error);
      return [...initialUserData];
    }
  }

  public static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  public getAllUsers(): User[] {
    return this.userData;
  }

  public getUserById(id: number): User | undefined {
    return this.userData.find(user => user.id === id);
  }

  public updateUser(id: number, updatedData: Partial<User> & Partial<SnakeCaseUser>): User {
    try {
      const userIndex = this.userData.findIndex(user => user.id === id);
      if (userIndex === -1) {
        throw new Error(`User with ID ${id} not found`);
      }

      const user = this.userData[userIndex];
      const formattedData = {
        ...updatedData,
        title: updatedData.title || user.title,
        firstName: (updatedData as SnakeCaseUser).first_name ?? updatedData.firstName ?? user.firstName,
        lastName: (updatedData as SnakeCaseUser).last_name ?? updatedData.lastName ?? user.lastName,
        updatedAt: new Date()
      };

      // Remove snake_case properties
      delete formattedData.first_name;
      delete formattedData.last_name;

      // Update user data
      this.userData[userIndex] = {
        ...this.userData[userIndex],
        ...formattedData
      };

      // Save to localStorage
      this.saveToStorage();

      // Also update the current user in localStorage if it matches
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        if (parsedUser.id === id) {
          const updatedUserData = {
            ...parsedUser,
            ...formattedData,
            updatedAt: formattedData.updatedAt.toISOString()
          };
          localStorage.setItem('user', JSON.stringify(updatedUserData));
        }
      }

      return this.userData[userIndex];
    } catch (error) {
      console.error('Error updating mock user:', error);
      throw error;
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(this.userData, (_key, value) => {
        // Handle Date objects
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    } catch (error) {
      console.error('Error saving mock data:', error);
      throw new Error('Failed to save mock data to storage');
    }
  }

  public resetMockData(): void {
    try {
      this.userData = [...initialUserData];
      this.saveToStorage();
      
      // Also reset current user to admin if using mock data
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        const adminUser = this.userData.find(u => u.id === 1);
        if (adminUser && parsedUser.id === 1) {
          localStorage.setItem('user', JSON.stringify(adminUser));
        }
      }
    } catch (error) {
      console.error('Error resetting mock data:', error);
      throw new Error('Failed to reset mock data');
    }
  }

  public profile = {
    getProfile: (): any => {
      const currentUser = localStorage.getItem('userData');
      if (!currentUser) {
        throw new Error('No user found');
      }
      return {
        success: true,
        data: JSON.parse(currentUser)
      };
    },

    updateProfile: (data: any): any => {
      try {
        const currentUser = localStorage.getItem('userData');
        if (!currentUser) {
          throw new Error('No user found');
        }

        const updatedUser = {
          ...JSON.parse(currentUser),
          ...data
        };

        localStorage.setItem('userData', JSON.stringify(updatedUser));

        return {
          success: true,
          data: updatedUser
        };
      } catch (error) {
        return {
          success: false,
          error: 'Failed to update profile'
        };
      }
    }
  };
}

export const mockDataService = MockDataService.getInstance();
export default mockDataService;
