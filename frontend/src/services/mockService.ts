// src/services/mockService.ts
import { classData } from '../mockData/classData';
import { classStudentData } from '../mockData/classStudentData';
import { userData } from '../mockData/userData';
import { Class, ClassStudent, User } from '../types';

// In-memory storage initialized with mock data
let classes: Class[] = [...classData];
let classStudents: ClassStudent[] = [...classStudentData];

export const ClassService = {
  // Get all classes sorted by creation date (newest first)
  getAllClasses: async (): Promise<Class[]> => {
    return Promise.resolve([...classes]
      .filter(c => c.isActive)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
  },

  // Get a single class by ID
  getClass: async (classId: number): Promise<Class | null> => {
    const classItem = classes.find(c => c.classId === classId);
    return Promise.resolve(classItem || null);
  },

  // Create a new class
  createClass: async (data: Omit<Class, 'classId' | 'createdAt' | 'updatedAt'>): Promise<Class> => {
    const newClass: Class = {
      classId: Math.max(0, ...classes.map(c => c.classId)) + 1,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    classes.push(newClass);
    return Promise.resolve(newClass);
  },

  // Update a class
  updateClass: async (classId: number, data: Partial<Class>): Promise<Class | null> => {
    const index = classes.findIndex(c => c.classId === classId);
    if (index === -1) return Promise.resolve(null);

    classes[index] = {
      ...classes[index],
      ...data,
      updatedAt: new Date()
    };
    return Promise.resolve(classes[index]);
  },

  // Soft delete a class and its related data
  softDeleteClass: async (classId: number, userId: number): Promise<boolean> => {
    const classIndex = classes.findIndex(c => c.classId === classId);
    if (classIndex === -1) return Promise.resolve(false);

    // Soft delete the class
    classes[classIndex] = {
      ...classes[classIndex],
      isActive: false,
      updatedAt: new Date(),
      updatedByUserId: userId
    };

    // Soft delete related class students
    classStudents = classStudents.map(student => 
      student.classId === classId 
        ? { ...student, isActive: false, updatedAt: new Date(), updatedByUserId: userId }
        : student
    );

    return Promise.resolve(true);
  },

  // Delete a class
  deleteClass: async (classId: number): Promise<boolean> => {
    const initialLength = classes.length;
    classes = classes.filter(c => c.classId !== classId);
    classStudents = classStudents.filter(s => s.classId !== classId);
    return Promise.resolve(classes.length < initialLength);
  }
};

export const ClassStudentService = {
  // Get all students in a class
  getStudents: async (classId: number): Promise<ClassStudent[]> => {
    return Promise.resolve(classStudents.filter(s => s.classId === classId));
  },

  // Get a single student
  getStudent: async (classId: number, studentId: number): Promise<ClassStudent | null> => {
    const student = classStudents.find(s => s.classId === classId && s.classStudentId === studentId);
    return Promise.resolve(student || null);
  },

  // Create a new student
  createStudent: async (
    classId: number, 
    data: Omit<ClassStudent, 'classStudentId' | 'classId' | 'createdAt' | 'updatedAt'>
  ): Promise<ClassStudent> => {
    const newStudent: ClassStudent = {
      classStudentId: Math.max(0, ...classStudents.map(s => s.classStudentId)) + 1,
      classId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    classStudents.push(newStudent);
    return Promise.resolve(newStudent);
  },

  // Update a student
  updateStudent: async (
    classId: number,
    studentId: number,
    data: Partial<ClassStudent>
  ): Promise<ClassStudent | null> => {
    const index = classStudents.findIndex(s => 
      s.classId === classId && s.classStudentId === studentId
    );
    
    if (index === -1) return Promise.resolve(null);

    classStudents[index] = {
      ...classStudents[index],
      ...data,
      updatedAt: new Date()
    };
    return Promise.resolve(classStudents[index]);
  },

  // Delete a student
  deleteStudent: async (classId: number, studentId: number): Promise<boolean> => {
    const initialLength = classStudents.length;
    classStudents = classStudents.filter(s => 
      !(s.classId === classId && s.classStudentId === studentId)
    );
    return Promise.resolve(classStudents.length < initialLength);
  }
};

export const UserService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    return Promise.resolve([...userData]);
  },

  // Get user by email
  getUserByEmail: async (email: string): Promise<User | null> => {
    const user = userData.find(u => u.email === email);
    return Promise.resolve(user || null);
  },

  // Restore a deleted user
  restoreUser: async (userId: number): Promise<boolean> => {
    const userIndex = userData.findIndex(u => u.userId === userId);
    if (userIndex === -1) return Promise.resolve(false);

    userData[userIndex] = {
      ...userData[userIndex],
      isDeleted: false,
      updatedAt: new Date()
    };
    return Promise.resolve(true);
  }
};

export const ProfileService = {
  getProfile: () => {
    try {
      const currentUser = localStorage.getItem('user');
      if (!currentUser) {
        return {
          success: false,
          error: 'No user found'
        };
      }

      const userData = JSON.parse(currentUser);
      return {
        success: true,
        data: {
          ...userData,
          first_name: userData.firstName,
          last_name: userData.lastName
        }
      };
    } catch (error) {
      console.error('Mock profile get error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get profile'
      };
    }
  },

  updateProfile: async (data: {
    title: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    institution: string;
    province: string;
  }) => {
    try {
      const currentUser = localStorage.getItem('user');
      if (!currentUser) {
        return {
          success: false,
          error: 'No user found'
        };
      }

      const userData = JSON.parse(currentUser);
      const updatedUser = {
        ...userData,
        title: data.title,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        institution: data.institution,
        province: data.province,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Return data in the same format as the API would
      return {
        success: true,
        data: {
          ...updatedUser,
          first_name: updatedUser.firstName,
          last_name: updatedUser.lastName
        }
      };
    } catch (error) {
      console.error('Mock profile update error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      };
    }
  }
};