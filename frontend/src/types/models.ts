// Common Types
export type ID = number;
export type Formula = 'min' | 'max' | 'average';
export const UserRoles = ['super_admin', 'admin', 'staff', 'teacher', 'student'] as const;
export type UserRole = typeof UserRoles[number];

// Base Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BaseEntity {
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: ID | null;
  updatedBy: ID | null;
}

// Core Entities
export interface User extends BaseEntity {
  id: ID;
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
  roles: UserRole;
}

export interface Class extends BaseEntity {
  id: ID;
  title: string;
  subtitle: string | null;
  students?: Student[];
}

export interface Student extends BaseEntity {
  id: ID;
  classId: ID;
  title: string;
  firstName: string;
  lastName: string;
  class?: Class;
}

// KPI Related
export interface SubKPI {
  name: string;
  nameEn: string;
  min: number;
  max: number;
  formula: Formula;
  shortDescription: string;
  longDescription: string;
  sampleImageUrl?: string;
}

export interface KPI {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  formula: Formula;
  subKPIs: Record<string, SubKPI>;
}

// Scoring System
export interface ScoreValue {
  pre: number | null;
  post: number | null;
}

export interface Score extends BaseEntity {
  id: ID;
  classStudentId: ID;
  kpiId: string;
  subKpiId: string;
  preScore: number | null;
  postScore: number | null;
}

// Reporting Interfaces
export interface KPIScoreData {
  kpiId: string;
  preScore: number | null;  // Calculated from subKPI scores using KPI's formula
  postScore: number | null; // Calculated from subKPI scores using KPI's formula
  improvement: number | null;
  subKpiScores: Record<string, ScoreValue>; // Key is subKpiId
}

export interface StudentKPIReport {
  studentId: ID;
  studentName: string;
  scores: Record<string, KPIScoreData>; // Key is kpiId
}

export interface ClassKPIReport {
  classId: ID;
  className: string;
  averageScores: Record<string, KPIScoreData>; // Key is kpiId
  studentScores: StudentKPIReport[];
}