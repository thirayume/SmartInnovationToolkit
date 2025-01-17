// src/mockData/classData.ts
import { Class } from '../types';

export const classData: Class[] = [
  {
    classId: 1,
    title: 'Mathematics 101',
    subtitle: 'Basic Mathematics for Grade 10',
    isActive: true,
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-10T08:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1
  },
  {
    classId: 2,
    title: 'Science Class',
    subtitle: 'Physics and Chemistry Combined',
    isActive: true,
    createdAt: new Date('2024-01-09T09:00:00Z'),
    updatedAt: new Date('2024-01-09T09:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1
  },
  {
    classId: 3,
    title: 'English Literature',
    subtitle: 'English Literature',
    isActive: true,
    createdAt: new Date('2024-01-09T09:00:00Z'),
    updatedAt: new Date('2024-01-09T09:00:00Z'),
    createdByUserId: 1,
    updatedByUserId: 1
  }
];