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

export interface ClassroomCardProps {
	isCreate?: boolean;
	classroom?: Class;
	onImportClick?: (id: string, e: React.MouseEvent) => void;
	onReportClick?: (id: string) => void;
}

export interface ScoreValue {
	pre: number | null;
	post: number | null;
}

export type SubKPIScores = Record<string, ScoreValue>;
export type KPIScores = Record<string, SubKPIScores>;
export type StudentScores = Record<string, KPIScores>;

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
