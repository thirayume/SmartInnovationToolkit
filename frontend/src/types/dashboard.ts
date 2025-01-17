// src/types/dashboard.ts
export interface Classroom {
	id: number;
	year: number;
	unit: number;
}

export interface ClassroomCardProps {
	isCreate?: boolean;
	classroom?: Classroom;
	onImportClick?: (id: number, e: React.MouseEvent) => void;
	onReportClick?: (id: number) => void;
}