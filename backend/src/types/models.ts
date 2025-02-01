// src/types/models.ts
export interface Class {
	id: number;
	title: string;
	subtitle: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	updatedBy: string;
}

export interface Student {
	id: number;
	classId: string;
	title: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	updatedBy: string;
}

export interface User {
	id: number;
	email: string;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    institution: string;
    province: string;
    emailVerified: boolean;
    adminVerified: boolean;
    emailVerifiedAt: Date;
    adminVerifiedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    roles: string[];
}