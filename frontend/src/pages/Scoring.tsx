// src/pages/ScoringPage.tsx
import React, { useState } from 'react';
import { HelpCircle, X as XIcon, Trash2, ChevronLeft } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  // AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams, useNavigate } from 'react-router-dom';
import { kpiData } from '@/mockData/kpiData';
import { classData } from '@/mockData/classData';
import { classStudentData } from '@/mockData/classStudentData';
import { classStudentScoreData } from '@/mockData/classStudentScoreData';
import { ScoreValue, StudentScores, StudentTotalScores } from '@/mockData/types';
import { useTranslation } from 'react-i18next';

interface ScoreButtonProps {
  value: number;
  isSelected: boolean;
  onClick: () => void;
}

interface ScoreCellProps {
  type: 'pre' | 'post';
  scores: number | null;
  max: number;
  onScoreChange: (value: number) => void;
  onClear: () => void;
}

const initializeScores = (classId: number): StudentScores => {
  const scores: StudentScores = {};

  // Only initialize scores for students in this class
  const classStudents = classStudentData.filter(cs => cs.classId === classId);

  classStudents.forEach(classStudent => {
    scores[classStudent.classStudentId] = {};
    Object.keys(kpiData).forEach(kpiId => {
      scores[classStudent.classStudentId][kpiId] = {};
      Object.keys(kpiData[kpiId].subKPIs).forEach(subKpiId => {
        scores[classStudent.classStudentId][kpiId][subKpiId] = {
          pre: null,
          post: null
        };
      });
    });
  });

  // Load existing scores for this class
  classStudentScoreData.forEach(score => {
    const student = classStudents.find(cs => cs.classStudentId === score.classStudentId);
    if (student && scores[score.classStudentId]?.[score.kpiId]?.[score.subKpiId]) {
      scores[score.classStudentId][score.kpiId][score.subKpiId] = {
        pre: score.preScore,
        post: score.postScore
      };
    }
  });

  return scores;
};

const ScoreButton: React.FC<ScoreButtonProps> = ({ value, isSelected, onClick }) => (
  <button
    className={`w-8 h-8 rounded-full text-sm font-medium ${isSelected
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-blue-400'
      }`}
    onClick={onClick}
  >
    {value}
  </button>
);

const ScoreCell: React.FC<ScoreCellProps> = ({ type, scores, max, onScoreChange, onClear }) => (
  <div className="relative">
    <div className={`p-2 rounded flex justify-center gap-1 ${type === 'pre' ? 'bg-blue-50' : 'bg-green-50'
      }`}>
      {Array.from({ length: max }, (_, i) => (
        <ScoreButton
          key={`${type}-${i + 1}`}
          value={i + 1}
          isSelected={scores === i + 1}
          onClick={() => onScoreChange(i + 1)}
        />
      ))}
      {scores !== null && (
        <button
          onClick={onClear}
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
        >
          <XIcon className="w-3 h-3" />
        </button>
      )}
    </div>
  </div>
);

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

// const calculateTotalScore = (
//   studentScores: Record<string, Record<string, ScoreValue>>,
//   kpiId: string
// ): number | null => {
//   if (!studentScores || !studentScores[kpiId]) return null;

//   const kpi = kpiData[kpiId];
//   const subKPIScores = Object.entries(studentScores[kpiId]).map(([subKpiId, scores]) => {
//     const subKPI = kpi.subKPIs[subKpiId];
//     return calculateSubKPIScore(scores.pre, scores.post, subKPI.formula);
//   }).filter((score): score is number => score !== null);

//   if (subKPIScores.length === 0) return null;

//   switch (kpi.formula) {
//     case 'min':
//       return Math.min(...subKPIScores);
//     case 'max':
//       return Math.max(...subKPIScores);
//     case 'average':
//     default:
//       return subKPIScores.reduce((a, b) => a + b, 0) / subKPIScores.length;
//   }
// };

const calculateTotalScores = (
  studentScores: Record<string, Record<string, ScoreValue>>,
  kpiId: string
): StudentTotalScores => {
  if (!studentScores || !studentScores[kpiId]) return { pre: null, post: null };

  const subKPIScores = Object.entries(studentScores[kpiId]).map(([_, scores]) => ({
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

const ScoringPage = () => {
  const { classId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentClassId = parseInt(classId || '1');

  // Redirect to class 1 if no classId is provided
  if (!classId) {
    navigate('/scoring/1');
    return null;
  }

  const currentClass = classData.find(c => c.classId === currentClassId);

  // Redirect to class 1 if invalid classId
  if (!currentClass) {
    navigate('/scoring/1');
    return null;
  }

  // Filter students by class
  const classStudents = classStudentData.filter(cs => cs.classId === currentClassId);

  const [activeKPI, setActiveKPI] = useState<string>('CB');
  const [scores, setScores] = useState<StudentScores>(() => initializeScores(currentClassId));
  const [savedScores, setSavedScores] = useState<StudentScores>(() => initializeScores(currentClassId));
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showHelpDialog, setShowHelpDialog] = useState<boolean>(false);
  const [selectedSubKPI, setSelectedSubKPI] = useState<{
    name: string;
    shortDescription: string;
    longDescription: string;
    sampleImageUrl?: string;
  } | null>(null);

  const handleScoreChange = (
    studentId: number,
    kpiId: string,
    subKpiId: string,
    type: 'pre' | 'post',
    value: number
  ) => {
    setScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [kpiId]: {
          ...prev[studentId][kpiId],
          [subKpiId]: {
            ...prev[studentId][kpiId][subKpiId],
            [type]: value
          }
        }
      }
    }));
    setHasChanges(true);
  };

  const handleClearCell = (
    studentId: number,
    kpiId: string,
    subKpiId: string,
    type: 'pre' | 'post'
  ) => {
    setScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [kpiId]: {
          ...prev[studentId][kpiId],
          [subKpiId]: {
            ...prev[studentId][kpiId][subKpiId],
            [type]: null
          }
        }
      }
    }));
    setHasChanges(true);
  };

  const handleResetAll = () => {
    setScores(savedScores);
    setHasChanges(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Mock API call - replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSavedScores(scores);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearStudentScores = (studentId: number) => {
    setScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [activeKPI]: Object.keys(kpiData[activeKPI].subKPIs).reduce((acc, subKpiId) => ({
          ...acc,
          [subKpiId]: { pre: null, post: null }
        }), {})
      }
    }));
    setHasChanges(true);
  };

  const handleHelpClick = (name: string, shortDescription: string, longDescription: string, sampleImageUrl?: string) => {
    setSelectedSubKPI({ name, shortDescription, longDescription, sampleImageUrl });
    setShowHelpDialog(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/classroom`)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('common.actions.back')}
            </Button>
            <h1 className="text-2xl font-semibold">ชั้นเรียน/ประเมิน {currentClass?.title}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleResetAll}
              disabled={!hasChanges}
            >
              ยกเลิกการแก้ไข
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? 'กำลังบันทึก...' : 'บันทึก'}
            </Button>
          </div>
        </div>

        {/* KPI Tabs */}
        <div className="mb-6 border-b">
          <div className="flex flex-wrap -mb-px">
            {Object.values(kpiData).map((kpi) => (
              <button
                key={kpi.id}
                className={`mr-2 px-6 py-3 font-medium text-sm rounded-t-lg ${activeKPI === kpi.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setActiveKPI(kpi.id)}
              >
                {kpi.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scoring Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left min-w-[200px] sticky left-0 bg-gray-50">
                  ชื่อนักเรียน
                </th>
                {Object.entries(kpiData[activeKPI].subKPIs).map(([subId, subKPI]) => (
                  <th key={subId} className="border p-2 min-w-[280px]">
                    <div className="flex items-start mb-2">
                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger asChild>
                            <span className="text-sm font-medium cursor-help">
                              {subKPI.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{subKPI.shortDescription}</p>
                          </TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>
                      <button
                        onClick={() => handleHelpClick(
                          subKPI.name,
                          subKPI.shortDescription,
                          subKPI.longDescription,
                          subKPI.sampleImageUrl
                        )}
                        className="ml-1"
                      >
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-2 rounded text-center text-sm">Pre</div>
                      <div className="bg-green-50 p-2 rounded text-center text-sm">Post</div>
                    </div>
                  </th>
                ))}
                <th className="border p-2 w-24 bg-yellow-50">Pre</th>
                <th className="border p-2 w-24 bg-yellow-50">Post</th>
                <th className="border p-2 w-16">Clear</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map(classStudent => (
                <tr key={classStudent.classStudentId} className="hover:bg-gray-50">
                  <td className="border p-2 sticky left-0 bg-white">
                    {classStudent?.student?.title} {classStudent?.student?.firstName} {classStudent?.student?.lastName}
                  </td>
                  {Object.entries(kpiData[activeKPI].subKPIs).map(([subId, subKPI]) => (
                    <td key={subId} className="border p-2">
                      <div className="grid grid-cols-2 gap-4">
                        <ScoreCell
                          type="pre"
                          max={subKPI.max}
                          scores={scores[classStudent.classStudentId]?.[activeKPI]?.[subId]?.pre ?? null}
                          onScoreChange={(value) => handleScoreChange(
                            classStudent.classStudentId,
                            activeKPI,
                            subId,
                            'pre',
                            value
                          )}
                          onClear={() => handleClearCell(
                            classStudent.classStudentId,
                            activeKPI,
                            subId,
                            'pre'
                          )}
                        />
                        <ScoreCell
                          type="post"
                          max={subKPI.max}
                          scores={scores[classStudent.classStudentId]?.[activeKPI]?.[subId]?.post ?? null}
                          onScoreChange={(value) => handleScoreChange(
                            classStudent.classStudentId,
                            activeKPI,
                            subId,
                            'post',
                            value
                          )}
                          onClear={() => handleClearCell(
                            classStudent.classStudentId,
                            activeKPI,
                            subId,
                            'post'
                          )}
                        />
                      </div>
                    </td>
                  ))}
                  {(() => {
                    const totals = calculateTotalScores(scores[classStudent.classStudentId], activeKPI);
                    return (
                      <>
                        <td className="border p-2 text-center bg-yellow-50 font-medium">
                          {totals.pre?.toFixed(1) || '-'}
                        </td>
                        <td className="border p-2 text-center bg-yellow-50 font-medium">
                          {totals.post?.toFixed(1) || '-'}
                        </td>
                      </>
                    );
                  })()}
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleClearStudentScores(classStudent.classStudentId)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Clear all scores"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Help Dialog */}
      <AlertDialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex flex-col space-y-1.5">
              <AlertDialogTitle>{selectedSubKPI?.name}</AlertDialogTitle>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium text-gray-900">
                    {selectedSubKPI?.shortDescription}
                  </div>
                  <div className="mt-4 whitespace-pre-wrap">
                    {selectedSubKPI?.longDescription}
                  </div>
                  {selectedSubKPI?.sampleImageUrl && (
                    <div className="mt-4">
                      <img
                        src={selectedSubKPI.sampleImageUrl}
                        alt="Sample"
                        className="max-w-full rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ปิด</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScoringPage;