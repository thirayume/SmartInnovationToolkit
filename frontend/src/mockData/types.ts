// src/mockData/types.ts
export interface BaseEntity {
  isActive: boolean;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface SubKPI {
  name: string;
  nameEn: string;
  min: number;
  max: number;
  formula: 'min' | 'max' | 'average';
  shortDescription: string;
  longDescription: string;
  sampleImageUrl?: string;
}

export interface KPI {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  formula: 'min' | 'max' | 'average';
  subKPIs: Record<string, SubKPI>;
}

export interface Student {
  email: string;
  title: string;
  firstName: string;
  lastName: string;
}

export interface Class extends BaseEntity {
  classId: number;
  name: string;
  description: string;
}

export interface ClassStudent extends BaseEntity {
  classStudentId: number;
  classId: number;
  studentUserId: number;
  enrolledAt: Date;
  enrolledByUserId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: number;
  updatedByUserId: number;
  student: Student;
}

export interface Score extends BaseEntity {
  scoreId: number;
  classStudentId: number;
  kpiId: string;
  subKpiId: string;
  preScore: number | null;
  postScore: number | null;
}

export interface ClassStudentScore extends BaseEntity {
  scoreId: number;
  classStudentId: number;
  kpiId: string;
  subKpiId: string;
  preScore: number | null;
  postScore: number | null;
}

// For chart data
export interface KPIScoreData {
  kpiId: string;
  preScore: number | null;
  postScore: number | null;
  improvement: number | null;
}

export interface StudentKPIReport {
  studentId: number;
  studentName: string;
  scores: KPIScoreData[];
}

export interface ClassKPIReport {
  classId: number;
  className: string;
  averageScores: KPIScoreData[];
  studentScores: StudentKPIReport[];
}

export interface ScoreValue {
  pre: number | null;
  post: number | null;
}

export interface StudentScores {
  [studentId: number]: {
    [kpiId: string]: {
      [subKpiId: string]: ScoreValue;
    };
  };
}

export interface StudentTotalScores {
  pre: number | null;
  post: number | null;
}