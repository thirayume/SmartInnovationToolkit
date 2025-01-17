// src/pages/Summary.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, BarChart2, Users, FileBarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ClassService, ClassStudentService } from '../services/mockService';
import { Class, ClassStudent } from '../types';

const Summary: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class | null>(null);
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isComparisonDialogOpen, setIsComparisonDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClassData();
    fetchStudents();
  }, [classId]);

  const fetchClassData = async () => {
    try {
      const data = await ClassService.getClass(Number(classId));
      if (data) {
        setClassData(data);
      }
    } catch (error) {
      console.error('Error fetching class:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await ClassStudentService.getStudents(Number(classId));
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSelect = (studentId: number) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      }
      if (prev.length >= 6) {
        return prev;
      }
      return [...prev, studentId];
    });
  };

  const handleComparisonReport = () => {
    if (selectedStudents.length > 0 && selectedStudents.length <= 6) {
      navigate(`/comparison-report/${classId}?students=${selectedStudents.join(',')}`);
    }
  };

  const handleClassSummaryReport = () => {
    const queryParams = selectedStudents.length > 0 
      ? `?students=${selectedStudents.join(',')}`
      : '';
    navigate(`/class-summary-report/${classId}${queryParams}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {t('summary.title')} - {classData?.title}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleClassSummaryReport}
            className="flex items-center gap-2"
          >
            <FileBarChart className="h-4 w-4" />
            {t('summary.classSummary')}
          </Button>
          <Button
            onClick={() => setIsComparisonDialogOpen(true)}
            disabled={selectedStudents.length === 0 || selectedStudents.length > 6}
            className="flex items-center gap-2"
          >
            <BarChart2 className="h-4 w-4" />
            {t('summary.comparison')}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div>{t('common.loading')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <Card key={student.classStudentId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedStudents.includes(student.classStudentId)}
                    onCheckedChange={() => handleStudentSelect(student.classStudentId)}
                  />
                  <div className="font-semibold">
                    {student.student?.title} {student.student?.firstName} {student.student?.lastName}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(`/individual-report/${classId}/${student.classStudentId}`)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isComparisonDialogOpen} onOpenChange={setIsComparisonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('summary.comparison')}</DialogTitle>
            <DialogDescription>
              {t('summary.comparisonDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-2">
              {t('summary.selectedStudents', { count: selectedStudents.length })}
            </p>
            <ul className="space-y-2">
              {students
                .filter(s => selectedStudents.includes(s.classStudentId))
                .map(student => (
                  <li key={student.classStudentId} className="text-sm">
                    {student.student?.title} {student.student?.firstName} {student.student?.lastName}
                  </li>
                ))}
            </ul>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsComparisonDialogOpen(false)}
            >
              {t('common.actions.cancel')}
            </Button>
            <Button onClick={handleComparisonReport}>
              {t('summary.viewComparison')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Summary;