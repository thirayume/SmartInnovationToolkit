// src/pages/IndividualReport.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { kpiData } from '../mockData/kpiData';
import { classStudentScoreData } from '../mockData/classStudentScoreData';
import { classStudentData } from '../mockData/classStudentData';
import {
  // KPI,
  ClassStudent,
  // ClassStudentScore,
  ScoreValue,
  StudentScores
} from '../mockData/types';

interface KPIScore {
  pre: number | null;
  post: number | null;
  improvement: number;
}

interface ReportData {
  studentName: string;
  scores: Record<string, KPIScore>;
  descriptions: Record<string, string>;
}

// const calculateSubKPIScore = (
//   preScore: number | null,
//   postScore: number | null,
//   formula: 'min' | 'max' | 'average'
// ): number | null => {
//   if (preScore === null && postScore === null) return null;
//   if (preScore === null) return postScore;
//   if (postScore === null) return preScore;

//   switch (formula) {
//     case 'min':
//       return Math.min(preScore, postScore);
//     case 'max':
//       return Math.max(preScore, postScore);
//     case 'average':
//       return (preScore + postScore) / 2;
//     default:
//       return Math.max(preScore, postScore);
//   }
// };

const calculateTotalScores = (
  studentScores: Record<string, Record<string, ScoreValue>>,
  kpiId: string
): { pre: number | null; post: number | null } => {
  if (!studentScores || !studentScores[kpiId]) return { pre: null, post: null };

  const subKPIScores = Object.entries(studentScores[kpiId]).map(([, scores]) => ({
    pre: scores.pre,
    post: scores.post
  }));

  const validPreScores = subKPIScores
    .map(scores => scores.pre)
    .filter((score): score is number => score !== null);

  const validPostScores = subKPIScores
    .map(scores => scores.post)
    .filter((score): score is number => score !== null);

  return {
    pre: validPreScores.length > 0
      ? validPreScores.reduce((a, b) => a + b, 0) / validPreScores.length
      : null,
    post: validPostScores.length > 0
      ? validPostScores.reduce((a, b) => a + b, 0) / validPostScores.length
      : null
  };
};

const useStudentScores = (studentId: string | undefined) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    if (!studentId) return;

    // Find the student's classStudentId
    const student = classStudentData.find(cs => cs.studentUserId === Number(studentId)) as ClassStudent | undefined;
    if (!student) return;

    // Initialize scores structure
    const studentScores: StudentScores = { [student.classStudentId]: {} };
    Object.keys(kpiData).forEach(kpiId => {
      studentScores[student.classStudentId][kpiId] = {};
      Object.keys(kpiData[kpiId].subKPIs).forEach(subKpiId => {
        studentScores[student.classStudentId][kpiId][subKpiId] = {
          pre: null,
          post: null
        };
      });
    });

    // Load existing scores
    classStudentScoreData.forEach(score => {
      if (score.classStudentId === student.classStudentId) {
        studentScores[student.classStudentId][score.kpiId][score.subKpiId] = {
          pre: score.preScore,
          post: score.postScore
        };
      }
    });

    // Calculate report data
    const reportScores: Record<string, KPIScore> = {};
    const descriptions: Record<string, string> = {};

    Object.entries(kpiData).forEach(([kpiId, kpi]) => {
      const totalScores = calculateTotalScores(studentScores[student.classStudentId], kpiId);
      const improvement = totalScores.pre !== null && totalScores.post !== null
        ? ((totalScores.post - totalScores.pre) / totalScores.pre) * 100
        : 0;

      reportScores[kpiId] = {
        pre: totalScores.pre ?? 0,
        post: totalScores.post ?? 0,
        improvement
      };

      descriptions[kpiId] = kpi.description || '';
    });

    setReportData({
      studentName: `${student.student.title} ${student.student.firstName} ${student.student.lastName}`,
      scores: reportScores,
      descriptions
    });

  }, [studentId]);

  return reportData;
};

const IndividualReport: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const reportData = useStudentScores(studentId);

  const getChartData = () => {
    if (!reportData) return [];
    return Object.entries(reportData.scores).map(([kpiId, scores]) => ({
      dimension: t(`kpi.${kpiId}.title`),
      pre: scores.pre,
      post: scores.post,
      fullMark: 5,
      improvement: scores.improvement.toFixed(1) + '%'
    }));
  };

  if (!reportData) {
    return <div className="container mx-auto px-4 py-8">{t('common.states.loading')}</div>;
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
        <h1 className="text-3xl font-bold">{t('individualReport.title')}</h1>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">{reportData.studentName}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('individualReport.chart.title')}</h3>
          <div className="w-full h-[400px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/assets/chart_icons/icon_center.png" alt="center" className="w-12 h-12" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
              <img src="/assets/chart_icons/icon_cb.png" alt="collaboration" className="w-12 h-12" />
            </div>
            <div className="absolute top-1/4 right-0 translate-x-4">
              <img src="/assets/chart_icons/icon_cm.png" alt="communication" className="w-12 h-12" />
            </div>
            <div className="absolute bottom-1/4 right-0 translate-x-4">
              <img src="/assets/chart_icons/icon_iq.png" alt="inquiry" className="w-12 h-12" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
              <img src="/assets/chart_icons/icon_rs.png" alt="resilience" className="w-12 h-12" />
            </div>
            <div className="absolute bottom-1/4 left-0 -translate-x-4">
              <img src="/assets/chart_icons/icon_ps.png" alt="problem solving" className="w-12 h-12" />
            </div>
            <div className="absolute top-1/4 left-0 -translate-x-4">
              <img src="/assets/chart_icons/icon_ct.png" alt="creativity" className="w-12 h-12" />
            </div>
            <ResponsiveContainer>
              <RadarChart data={getChartData()} height={400}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar
                  name={t('common.form.labels.preScore')}
                  dataKey="pre"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.3}
                />
                <Radar
                  name={t('common.form.labels.postScore')}
                  dataKey="post"
                  stroke="#16a34a"
                  fill="#16a34a"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Scores Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t('individualReport.scores.title')}</h3>
          <div className="space-y-4">
            {getChartData().map((item) => (
              <div key={item.dimension} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{item.dimension}</h4>
                  <span className={`text-sm font-medium ${
                    parseFloat(item.improvement) > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.improvement}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">{t('common.form.labels.preScore')}:</span>
                    <span className="ml-2 font-medium">{item.pre}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{t('common.form.labels.postScore')}:</span>
                    <span className="ml-2 font-medium">{item.post}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {reportData.descriptions[item.dimension]}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IndividualReport;