// src/types/index.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type UserRole = 'super_admin' | 'admin' | 'staff' | 'teacher' | 'student';

export interface User extends BaseEntity {
  id: number;
  email: string;
  title: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  institution?: string;
  province?: string;
  emailVerified: boolean;
  adminVerified: boolean;
  emailVerifiedAt: Date | null;
  adminVerifiedAt: Date | null;
  isActive: boolean;
  isDeleted: boolean;
  roles: UserRole[];
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

export interface BaseEntity {
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: number | null;
  updatedByUserId: number | null;
}

export interface Class extends BaseEntity {
  id: number;
  classId: number;
  title: string;
  subtitle: string | null;
  isActive: boolean;
}

export interface ClassStudent extends BaseEntity {
  id: number;
  classStudentId: number;
  classId: number;
  studentUserId: number;
  enrolledAt: Date;
  enrolledByUserId: number;
  isActive: boolean;
  student?: {
    email: string;
    title: string;
    firstName: string;
    lastName: string;
  };
}

export interface ScoreValue {
  [key: string]: {
    [subKpiId: string]: {
      pre: number | null;
      post: number | null;
    };
  };
}