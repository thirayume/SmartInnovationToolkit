// src/components/dashboard/ClassroomCard.tsx
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, ClipboardList, Users } from 'lucide-react';
import { ClassroomCardProps } from '../../types/models';

const ClassroomCard = memo(({ 
  isCreate, 
  classroom, 
  onImportClick, 
  onReportClick 
}: ClassroomCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isCreate) {
    return (
      <div 
        className="bg-orange-500 text-white rounded-lg p-6 cursor-pointer hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center flex-col"
        onClick={() => navigate('/class/add')}
      >
        <Plus size={32} className="mb-2" />
        <span className="text-lg font-semibold">{t('dashboard.createClass')}</span>
      </div>
    );
  }

  if (!classroom) return null;

  return (
    <div className="relative bg-cyan-500 text-white rounded-lg p-6 cursor-pointer hover:bg-cyan-600 transition-colors duration-200">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold">
              {classroom.title}
            </h3>
            <p className="text-sm opacity-90">{classroom.subtitle}</p>
          </div>
          <button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md text-sm ml-2"
            onClick={(e) => onImportClick?.(classroom.uid, e)}
          >
            {t('dashboard.addStudents')}
          </button>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate(`/class/${classroom.uid}/students`)}
          >
            <ClipboardList size={20} className="mr-2" />
            <span>{t('dashboard.manageStudents')}</span>
          </div>
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onReportClick?.(classroom.uid)}
          >
            <Users size={20} className="mr-2" />
            <span>{t('dashboard.report')}</span>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 text-xs opacity-70">
          {new Date(classroom.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
});

ClassroomCard.displayName = 'ClassroomCard';

export default ClassroomCard;