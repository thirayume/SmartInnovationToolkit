// src/mockData/classStudentData.ts
import { ClassStudent } from '../types';

export const classStudentData: ClassStudent[] = [
  // Class 1 (Mathematics 101) Students
  {
    classStudentId: 1,
    classId: 1,
    studentUserId: 1,
    enrolledAt: new Date('2024-01-10T08:00:00Z'),
    enrolledByUserId: 1,
    isActive: true,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T08:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1,
    student: {
      email: 'john.smith@example.com',
      title: 'นาย',
      firstName: 'John',
      lastName: 'Smith'
    }
  },
  {
    classStudentId: 2,
    classId: 1,
    studentUserId: 2,
    enrolledAt: new Date('2024-01-10T08:00:00Z'),
    enrolledByUserId: 1,
    isActive: true,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T08:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1,
    student: {
      email: 'sarah.johnson@example.com',
      title: 'นางสาว',
      firstName: 'Sarah',
      lastName: 'Johnson'
    }
  },
  // Class 2 (Science Class) Students
  {
    classStudentId: 3,
    classId: 2,
    studentUserId: 3,
    enrolledAt: new Date('2024-01-10T08:00:00Z'),
    enrolledByUserId: 1,
    isActive: true,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T08:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1,
    student: {
      email: 'david.williams@example.com',
      title: 'นาย',
      firstName: 'David',
      lastName: 'Williams'
    }
  },
  {
    classStudentId: 4,
    classId: 2,
    studentUserId: 4,
    enrolledAt: new Date('2024-01-10T08:00:00Z'),
    enrolledByUserId: 1,
    isActive: true,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T08:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1,
    student: {
      email: 'emma.brown@example.com',
      title: 'นางสาว',
      firstName: 'Emma',
      lastName: 'Brown'
    }
  },
  // Class 3 (English Literature) Students
  {
    classStudentId: 5,
    classId: 3,
    studentUserId: 5,
    enrolledAt: new Date('2024-01-10T08:00:00Z'),
    enrolledByUserId: 1,
    isActive: true,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T08:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1,
    student: {
      email: 'michael.davis@example.com',
      title: 'นาย',
      firstName: 'Michael',
      lastName: 'Davis'
    }
  },
  {
    classStudentId: 6,
    classId: 3,
    studentUserId: 6,
    enrolledAt: new Date('2024-01-10T08:00:00Z'),
    enrolledByUserId: 1,
    isActive: true,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T08:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1,
    student: {
      email: 'lisa.wilson@example.com',
      title: 'นางสาว',
      firstName: 'Lisa',
      lastName: 'Wilson'
    }
  }
];