// src/services/dataService.ts
import api from './api';
import { ProfileService as MockProfileService } from './mockService';
import { ApiResponse, Class, ClassStudent, User } from '../types/models';
import { classData } from '../mockData/classData';
import { classStudentData } from '../mockData/classStudentData';
import { userData } from '../mockData/userData';

interface BaseEntity {
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class BaseService<T extends BaseEntity> {
  constructor(private mockData: T[], private entityName: string) {}

  protected async handleRequest<R>(operation: () => Promise<ApiResponse<R>>): Promise<ApiResponse<R>> {
    try {
      return await operation();
    } catch (error) {
      console.error(`${this.entityName} operation error:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : `Failed to perform operation on ${this.entityName}`
      };
    }
  }

  getAll = async (): Promise<ApiResponse<T[]>> => {
    return this.handleRequest(async () => ({
      success: true,
      data: this.mockData.filter(item => item.isActive)
    }));
  };

  getById = async (id: number): Promise<ApiResponse<T>> => {
    return this.handleRequest(async () => {
      const item = this.mockData.find(x => x.id === id && x.isActive);
      return item
        ? { success: true, data: item }
        : { success: false, error: `${this.entityName} not found` };
    });
  };

  add = async (data: Omit<T, keyof BaseEntity>): Promise<ApiResponse<T>> => {
    return this.handleRequest(async () => {
      const newId = Math.max(...this.mockData.map(x => x.id)) + 1;
      const newItem = {
        ...data,
        id: newId,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as T;
      this.mockData.push(newItem);
      return { success: true, data: newItem };
    });
  };

  edit = async (id: number, data: Partial<T>): Promise<ApiResponse<T>> => {
    return this.handleRequest(async () => {
      const index = this.mockData.findIndex(x => x.id === id);
      if (index === -1) return { success: false, error: `${this.entityName} not found` };
      
      this.mockData[index] = {
        ...this.mockData[index],
        ...data,
        updatedAt: new Date()
      };
      return { success: true, data: this.mockData[index] };
    });
  };

  delete = async (id: number): Promise<ApiResponse<void>> => {
    return this.handleRequest(async () => {
      const result = await this.edit(id, { isActive: false } as Partial<T>);
      if (!result.success) {
        return { success: false, error: result.error };
      }
      return { success: true };
    });
  };

  forceDelete = async (id: number): Promise<ApiResponse<void>> => {
    return this.handleRequest(async () => {
      const index = this.mockData.findIndex(x => x.id === id);
      if (index === -1) return { success: false, error: `${this.entityName} not found` };
      
      this.mockData.splice(index, 1);
      return { success: true };
    });
  };

  batchProcess = async (ids: number[], operation: 'delete' | 'forceDelete'): Promise<ApiResponse<void>> => {
    return this.handleRequest(async () => {
      const operations = ids.map(id => 
        operation === 'delete' ? this.delete(id) : this.forceDelete(id)
      );
      await Promise.all(operations);
      return { success: true };
    });
  };
}

class DataService {
  private getUseMockData(): boolean {
    return localStorage.getItem('useMockData') === 'true';
  }

  class = new BaseService<Class>(classData, 'Class');
  classStudent = {
    ...new BaseService<ClassStudent>(classStudentData, 'ClassStudent'),
    getByClassId: async (classId: number): Promise<ApiResponse<ClassStudent[]>> => {
      return this.getUseMockData()
        ? {
            success: true,
            data: classStudentData.filter(cs => cs.classId === classId && cs.isActive)
          }
        : api.classStudent.getByClassId(classId);
    },
    getByStudentId: async (studentId: number): Promise<ApiResponse<ClassStudent[]>> => {
      return this.getUseMockData()
        ? {
            success: true,
            data: classStudentData.filter(cs => cs.student?.id === studentId && cs.isActive)
          }
        : api.classStudent.getByStudentId(studentId);
    }
  };
  user = new BaseService<User>(userData, 'User');
}

export default new DataService();
