import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { ChevronLeft } from 'lucide-react';
import { classStudentData } from '../mockData/classStudentData';
import { classStudentScoreData } from '../mockData/classStudentScoreData';
import { kpiData } from '../mockData/kpiData';

interface StudentScore {
  studentId: number;
  studentName: string;
  scores: {
    [key: string]: {
      pre: number | null;
      post: number | null;
      improvement: number;
    };
  };
}

const ClassSummaryReport: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classId } = useParams();
  const [students, setStudents] = useState<StudentScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;

    // Get students in this class
    const classStudents = classStudentData.filter(cs => cs.classId === Number(classId));
    
    // Calculate scores for each student
    const studentScores = classStudents.map(classStudent => {
      const scores: { [key: string]: { pre: number | null; post: number | null; improvement: number } } = {};
      
      // Initialize scores for each KPI
      Object.keys(kpiData).forEach(kpiId => {
        const studentScores = classStudentScoreData.filter(
          score => score.classStudentId === classStudent.classStudentId && score.kpiId === kpiId
        );
        
        const preScores = studentScores.map(s => s.preScore).filter((s): s is number => s !== null);
        const postScores = studentScores.map(s => s.postScore).filter((s): s is number => s !== null);
        
        const preAvg = preScores.length > 0 ? preScores.reduce((a, b) => a + b, 0) / preScores.length : null;
        const postAvg = postScores.length > 0 ? postScores.reduce((a, b) => a + b, 0) / postScores.length : null;
        
        const improvement = preAvg !== null && postAvg !== null
          ? ((postAvg - preAvg) / preAvg) * 100
          : 0;

        scores[kpiId] = {
          pre: preAvg,
          post: postAvg,
          improvement
        };
      });

      return {
        studentId: classStudent.studentUserId,
        studentName: `${classStudent.student.title} ${classStudent.student.firstName} ${classStudent.student.lastName}`,
        scores
      };
    });

    setStudents(studentScores);
    setLoading(false);
  }, [classId]);

  const dimensions = ['CB', 'CM', 'CT', 'IQ', 'PS', 'RS'];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">{t('common.states.loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('common.actions.back')}
        </Button>
        <h1 className="text-2xl font-bold">{t('reports.summary.title')}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">{t('common.labels.studentName')}</TableHead>
              {dimensions.map(dim => (
                <React.Fragment key={dim}>
                  <TableHead className="text-center min-w-[100px]">
                    {t(`kpi.${dim}.title`)} {t('common.labels.preScore')}
                  </TableHead>
                  <TableHead className="text-center min-w-[100px]">
                    {t(`kpi.${dim}.title`)} {t('common.labels.postScore')}
                  </TableHead>
                  <TableHead className="text-center min-w-[100px]">
                    {t(`kpi.${dim}.title`)} {t('common.labels.improvement')}
                  </TableHead>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => (
              <TableRow 
                key={student.studentId}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/individual-report/${student.studentId}`)}
              >
                <TableCell className="font-medium">{student.studentName}</TableCell>
                {dimensions.map(dim => (
                  <React.Fragment key={dim}>
                    <TableCell className="text-center">
                      {student.scores[dim]?.pre?.toFixed(1) || '-'}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.scores[dim]?.post?.toFixed(1) || '-'}
                    </TableCell>
                    <TableCell 
                      className={`text-center ${
                        student.scores[dim]?.improvement > 0 
                          ? 'text-green-600' 
                          : student.scores[dim]?.improvement < 0 
                            ? 'text-red-600' 
                            : ''
                      }`}
                    >
                      {student.scores[dim]?.improvement.toFixed(1)}%
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClassSummaryReport;
