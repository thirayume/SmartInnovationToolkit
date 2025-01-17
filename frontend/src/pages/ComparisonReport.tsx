import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ReportData } from '../types/models';

const ComparisonReport: React.FC = () => {
  const { t } = useTranslation();
  const { classId } = useParams();
  const [selectedStudents, setSelectedStudents] = useState<ReportData[]>([]);
  const [availableStudents, setAvailableStudents] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch available students for the class
    // This should be replaced with actual API call
    setLoading(false);
  }, [classId]);

  const handleStudentSelect = (student: ReportData) => {
    if (selectedStudents.length >= 6 && !selectedStudents.find(s => s.studentName === student.studentName)) {
      return; // Max 6 students
    }
    
    setSelectedStudents(prev => {
      const exists = prev.find(s => s.studentName === student.studentName);
      if (exists) {
        return prev.filter(s => s.studentName !== student.studentName);
      }
      return [...prev, student];
    });
  };

  const getChartData = (students: ReportData[]) => {
    const dimensions = ['CT', 'PS', 'CB', 'RS', 'IQ', 'CM'];
    return dimensions.map(dim => ({
      dimension: t(`dimensions.${dim}`),
      ...students.reduce((acc, student) => ({
        ...acc,
        [student.studentName]: student.scores[dim] || 0,
      }), {}),
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">{t('common.loading')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('reports.comparison.title')}</h1>
      
      {/* Student Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('reports.comparison.selectStudents')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableStudents.map(student => (
            <button
              key={student.studentName}
              onClick={() => handleStudentSelect(student)}
              className={`p-3 rounded-lg border ${
                selectedStudents.find(s => s.studentName === student.studentName)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {student.studentName}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      {selectedStudents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: Math.ceil(selectedStudents.length / 2) }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col space-y-8">
              {selectedStudents.slice(rowIndex * 2, rowIndex * 2 + 2).map((student, index) => (
                <div key={student.studentName} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">{student.studentName}</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={getChartData([student])}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name={student.studentName}
                          dataKey={student.studentName}
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparisonReport;
