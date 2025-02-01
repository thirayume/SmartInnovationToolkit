// import { StudentScores } from '../types/models';

// export const studentScoresData: StudentScores[] = [
//   // Class 1 - Student 1 (John Smith) Scores
//   {
//     id: 1,
//     classStudentId: 1,
//     kpiId: 'CB',
//     subKpiId: 'CB1',
//     preScore: 2,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 2,
//     classStudentId: 1,
//     kpiId: 'CB',
//     subKpiId: 'CB2',
//     preScore: 4,
//     postScore: 3,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 3,
//     classStudentId: 1,
//     kpiId: 'CM',
//     subKpiId: 'CM1',
//     preScore: 1,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 4,
//     classStudentId: 1,
//     kpiId: 'CM',
//     subKpiId: 'CM2',
//     preScore: 5,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 5,
//     classStudentId: 1,
//     kpiId: 'IQ',
//     subKpiId: 'IQ1',
//     preScore: 3,
//     postScore: 2,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 6,
//     classStudentId: 1,
//     kpiId: 'IQ',
//     subKpiId: 'IQ2',
//     preScore: 2,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 7,
//     classStudentId: 1,
//     kpiId: 'RS',
//     subKpiId: 'RS1',
//     preScore: 4,
//     postScore: 2,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 8,
//     classStudentId: 1,
//     kpiId: 'RS',
//     subKpiId: 'RS2',
//     preScore: 1,
//     postScore: 3,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 9,
//     classStudentId: 1,
//     kpiId: 'PS',
//     subKpiId: 'PS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 10,
//     classStudentId: 1,
//     kpiId: 'PS',
//     subKpiId: 'PS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 11,
//     classStudentId: 1,
//     kpiId: 'CT',
//     subKpiId: 'CT1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 12,
//     classStudentId: 1,
//     kpiId: 'CT',
//     subKpiId: 'CT2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   // Class 1 - Student 2 (Sarah Johnson) Scores
//   {
//     id: 13,
//     classStudentId: 2,
//     kpiId: 'CB',
//     subKpiId: 'CB1',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 14,
//     classStudentId: 2,
//     kpiId: 'CB',
//     subKpiId: 'CB2',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 15,
//     classStudentId: 2,
//     kpiId: 'CM',
//     subKpiId: 'CM1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 16,
//     classStudentId: 2,
//     kpiId: 'CM',
//     subKpiId: 'CM2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 17,
//     classStudentId: 2,
//     kpiId: 'IQ',
//     subKpiId: 'IQ1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 18,
//     classStudentId: 2,
//     kpiId: 'IQ',
//     subKpiId: 'IQ2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 19,
//     classStudentId: 2,
//     kpiId: 'RS',
//     subKpiId: 'RS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 20,
//     classStudentId: 2,
//     kpiId: 'RS',
//     subKpiId: 'RS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 21,
//     classStudentId: 2,
//     kpiId: 'PS',
//     subKpiId: 'PS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 22,
//     classStudentId: 2,
//     kpiId: 'PS',
//     subKpiId: 'PS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 23,
//     classStudentId: 2,
//     kpiId: 'CT',
//     subKpiId: 'CT1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 24,
//     classStudentId: 2,
//     kpiId: 'CT',
//     subKpiId: 'CT2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   // Class 2 - Student 3 (David Williams) Scores
//   {
//     id: 25,
//     classStudentId: 3,
//     kpiId: 'CB',
//     subKpiId: 'CB1',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 26,
//     classStudentId: 3,
//     kpiId: 'CB',
//     subKpiId: 'CB2',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 27,
//     classStudentId: 3,
//     kpiId: 'CM',
//     subKpiId: 'CM1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 28,
//     classStudentId: 3,
//     kpiId: 'CM',
//     subKpiId: 'CM2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 29,
//     classStudentId: 3,
//     kpiId: 'IQ',
//     subKpiId: 'IQ1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 30,
//     classStudentId: 3,
//     kpiId: 'IQ',
//     subKpiId: 'IQ2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 31,
//     classStudentId: 3,
//     kpiId: 'RS',
//     subKpiId: 'RS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 32,
//     classStudentId: 3,
//     kpiId: 'RS',
//     subKpiId: 'RS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 33,
//     classStudentId: 3,
//     kpiId: 'PS',
//     subKpiId: 'PS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 34,
//     classStudentId: 3,
//     kpiId: 'PS',
//     subKpiId: 'PS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 35,
//     classStudentId: 3,
//     kpiId: 'CT',
//     subKpiId: 'CT1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 36,
//     classStudentId: 3,
//     kpiId: 'CT',
//     subKpiId: 'CT2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   // Class 2 - Student 4 (Emma Brown) Scores
//   {
//     id: 37,
//     classStudentId: 4,
//     kpiId: 'CB',
//     subKpiId: 'CB1',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 38,
//     classStudentId: 4,
//     kpiId: 'CB',
//     subKpiId: 'CB2',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 39,
//     classStudentId: 4,
//     kpiId: 'CM',
//     subKpiId: 'CM1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 40,
//     classStudentId: 4,
//     kpiId: 'CM',
//     subKpiId: 'CM2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 41,
//     classStudentId: 4,
//     kpiId: 'IQ',
//     subKpiId: 'IQ1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 42,
//     classStudentId: 4,
//     kpiId: 'IQ',
//     subKpiId: 'IQ2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 43,
//     classStudentId: 4,
//     kpiId: 'RS',
//     subKpiId: 'RS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 44,
//     classStudentId: 4,
//     kpiId: 'RS',
//     subKpiId: 'RS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 45,
//     classStudentId: 4,
//     kpiId: 'PS',
//     subKpiId: 'PS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 46,
//     classStudentId: 4,
//     kpiId: 'PS',
//     subKpiId: 'PS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 47,
//     classStudentId: 4,
//     kpiId: 'CT',
//     subKpiId: 'CT1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 48,
//     classStudentId: 4,
//     kpiId: 'CT',
//     subKpiId: 'CT2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   // Class 3 - Student 5 (Michael Davis) Scores
//   {
//     id: 49,
//     classStudentId: 5,
//     kpiId: 'CB',
//     subKpiId: 'CB1',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 50,
//     classStudentId: 5,
//     kpiId: 'CB',
//     subKpiId: 'CB2',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 51,
//     classStudentId: 5,
//     kpiId: 'CM',
//     subKpiId: 'CM1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 52,
//     classStudentId: 5,
//     kpiId: 'CM',
//     subKpiId: 'CM2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 53,
//     classStudentId: 5,
//     kpiId: 'IQ',
//     subKpiId: 'IQ1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 54,
//     classStudentId: 5,
//     kpiId: 'IQ',
//     subKpiId: 'IQ2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 55,
//     classStudentId: 5,
//     kpiId: 'RS',
//     subKpiId: 'RS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 56,
//     classStudentId: 5,
//     kpiId: 'RS',
//     subKpiId: 'RS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 57,
//     classStudentId: 5,
//     kpiId: 'PS',
//     subKpiId: 'PS1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 58,
//     classStudentId: 5,
//     kpiId: 'PS',
//     subKpiId: 'PS2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 59,
//     classStudentId: 5,
//     kpiId: 'CT',
//     subKpiId: 'CT1',
//     preScore: 3,
//     postScore: 4,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   },
//   {
//     id: 60,
//     classStudentId: 5,
//     kpiId: 'CT',
//     subKpiId: 'CT2',
//     preScore: 4,
//     postScore: 5,
//     isActive: true,
//     createdAt: new Date('2024-01-10T08:00:00Z'),
//     createdBy: 1,
//     updatedAt: new Date('2024-01-10T08:00:00Z'),
//     updatedBy: 1
//   }
// ];
// export default classStudentScoreData;


import { ClassKPIReport } from '../types/models';

export const studentScoresData: ClassKPIReport = {
  classId: 1,
  className: "Class 6/1",
  averageScores: {
    CB: {
      kpiId: "CB",
      preScore: 3.5,
      postScore: 4.2,
      improvement: 0.7,
      subKpiScores: {
        CB1: { pre: 3.4, post: 4.1 },
        CB2: { pre: 3.6, post: 4.3 }
      }
    },
    CM: {
      kpiId: "CM",
      preScore: 3.3,
      postScore: 4.0,
      improvement: 0.7,
      subKpiScores: {
        CM1: { pre: 3.2, post: 3.9 },
        CM2: { pre: 3.4, post: 4.1 }
      }
    },
    IQ: {
      kpiId: "IQ",
      preScore: 3.4,
      postScore: 4.1,
      improvement: 0.7,
      subKpiScores: {
        IQ1: { pre: 3.3, post: 4.0 },
        IQ2: { pre: 3.5, post: 4.2 }
      }
    },
    RS: {
      kpiId: "RS",
      preScore: 3.2,
      postScore: 4.0,
      improvement: 0.8,
      subKpiScores: {
        RS1: { pre: 3.1, post: 3.9 },
        RS2: { pre: 3.3, post: 4.1 }
      }
    },
    PS: {
      kpiId: "PS",
      preScore: 3.3,
      postScore: 4.1,
      improvement: 0.8,
      subKpiScores: {
        PS1: { pre: 3.2, post: 4.0 },
        PS2: { pre: 3.4, post: 4.2 }
      }
    },
    CT: {
      kpiId: "CT",
      preScore: 3.4,
      postScore: 4.2,
      improvement: 0.8,
      subKpiScores: {
        CT1: { pre: 3.3, post: 4.1 },
        CT2: { pre: 3.5, post: 4.3 }
      }
    }
  },
  studentScores: [
    {
      studentId: 1,
      studentName: "John Doe",
      scores: {
        CB: {
          kpiId: "CB",
          preScore: 3.0,
          postScore: 4.0,
          improvement: 1.0,
          subKpiScores: {
            CB1: { pre: 3.0, post: 4.0 },
            CB2: { pre: 3.0, post: 4.0 }
          }
        },
        CM: {
          kpiId: "CM",
          preScore: 3.0,
          postScore: 4.0,
          improvement: 1.0,
          subKpiScores: {
            CM1: { pre: 3.0, post: 4.0 },
            CM2: { pre: 3.0, post: 4.0 }
          }
        },
        IQ: {
          kpiId: "IQ",
          preScore: 3.0,
          postScore: 4.0,
          improvement: 1.0,
          subKpiScores: {
            IQ1: { pre: 3.0, post: 4.0 },
            IQ2: { pre: 3.0, post: 4.0 }
          }
        },
        RS: {
          kpiId: "RS",
          preScore: 3.0,
          postScore: 4.0,
          improvement: 1.0,
          subKpiScores: {
            RS1: { pre: 3.0, post: 4.0 },
            RS2: { pre: 3.0, post: 4.0 }
          }
        },
        PS: {
          kpiId: "PS",
          preScore: 3.0,
          postScore: 4.0,
          improvement: 1.0,
          subKpiScores: {
            PS1: { pre: 3.0, post: 4.0 },
            PS2: { pre: 3.0, post: 4.0 }
          }
        },
        CT: {
          kpiId: "CT",
          preScore: 3.0,
          postScore: 4.0,
          improvement: 1.0,
          subKpiScores: {
            CT1: { pre: 3.0, post: 4.0 },
            CT2: { pre: 3.0, post: 4.0 }
          }
        }
      }
    },
    {
      studentId: 2,
      studentName: "Jane Smith",
      scores: {
        CB: {
          kpiId: "CB",
          preScore: 4.0,
          postScore: 4.5,
          improvement: 0.5,
          subKpiScores: {
            CB1: { pre: 4.0, post: 4.5 },
            CB2: { pre: 4.0, post: 4.5 }
          }
        },
        CM: {
          kpiId: "CM",
          preScore: 4.0,
          postScore: 4.5,
          improvement: 0.5,
          subKpiScores: {
            CM1: { pre: 4.0, post: 4.5 },
            CM2: { pre: 4.0, post: 4.5 }
          }
        },
        IQ: {
          kpiId: "IQ",
          preScore: 4.0,
          postScore: 4.5,
          improvement: 0.5,
          subKpiScores: {
            IQ1: { pre: 4.0, post: 4.5 },
            IQ2: { pre: 4.0, post: 4.5 }
          }
        },
        RS: {
          kpiId: "RS",
          preScore: 4.0,
          postScore: 4.5,
          improvement: 0.5,
          subKpiScores: {
            RS1: { pre: 4.0, post: 4.5 },
            RS2: { pre: 4.0, post: 4.5 }
          }
        },
        PS: {
          kpiId: "PS",
          preScore: 4.0,
          postScore: 4.5,
          improvement: 0.5,
          subKpiScores: {
            PS1: { pre: 4.0, post: 4.5 },
            PS2: { pre: 4.0, post: 4.5 }
          }
        },
        CT: {
          kpiId: "CT",
          preScore: 4.0,
          postScore: 4.5,
          improvement: 0.5,
          subKpiScores: {
            CT1: { pre: 4.0, post: 4.5 },
            CT2: { pre: 4.0, post: 4.5 }
          }
        }
      }
    }
  ]
};