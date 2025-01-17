// src/types/models.ts
export interface Class {
	uid: string;
	title: string;
	subtitle: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	updatedBy: string;
      }
      
      export interface Student {
	uid: string;
	classId: string;
	title: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	updatedBy: string;
      }