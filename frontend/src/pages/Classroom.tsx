// src/pages/Classroom.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Users, Upload, UserPlus, Presentation, FileSpreadsheet, Trash2, BarChart3 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ClassService, ClassStudentService } from '../services/mockService';
import { Class } from '../types';

interface ClassroomCardProps {
  isCreate?: boolean;
  classroom?: Class;
  onImportClick?: (classId: number) => void;
  onReportClick?: (classId: number) => void;
  onDeleteClick?: (classId: number) => void;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({
  isCreate,
  classroom,
  // onImportClick, 
  // onReportClick,
  onDeleteClick
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (isCreate) {
    return (
      <div
        className="bg-orange-500 text-white rounded-lg p-6 cursor-pointer hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center flex-col"
        onClick={() => navigate('/class/add')}
      >
        <Presentation size={48} className="mb-4" />
        <span className="text-lg font-semibold">{t('classroom.create')}</span>
      </div>
    );
  }

  if (!classroom) return null;

  const handleScoringClick = () => {
    navigate(`/scoring/${classroom.classId}`);
  };

  return (
    <div className="bg-cyan-500 text-white rounded-lg p-6">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold">{classroom.title}</h3>
            <p className="text-sm opacity-90">{classroom.subtitle}</p>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors rounded-full"
            onClick={() => onDeleteClick?.(classroom.classId)}
            title={t('classroom.delete.title')}
          >
            <Trash2 size={18} />
          </Button>
        </div>
        <div className="flex justify-between space-x-1 mt-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/class/${classroom.classId}/students`)}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-2"
            title={t('classroom.actions.students.tooltip')}
          >
            <Users size={16} className="mr-1" />
            <span>{t('classroom.actions.students.short')}</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleScoringClick}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-2"
            title={t('classroom.actions.evaluate.tooltip')}
          >
            <ClipboardList size={16} className="mr-1" />
            <span>{t('classroom.actions.evaluate.short')}</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            // onClick={() => onReportClick?.(classroom.classId)}
            onClick={() => navigate(`/class/${classroom.classId}/students`)}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-2"
            title={t('classroom.actions.report.tooltip')}
          >
            <BarChart3 size={16} className="mr-1" />
            <span>{t('classroom.actions.report.short')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddStudentDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: string;
  onSubmit: (data: { id: string; title: string; name: string; surname: string; classId: string }) => void;
}> = ({ open, onOpenChange, classId, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ id: '', title: 'นาย', name: '', surname: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, classId });
    setFormData({ id: '', title: 'นาย', name: '', surname: '' });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('classroom.dialog.addStudent.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('classroom.dialog.addStudent.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('common.form.fields.studentId')}</label>
            <Input
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              placeholder={t('common.form.placeholders.studentId')}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('common.form.fields.title')}</label>
            <select
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            >
              <option value="นาย">{t('common.titles.mr')}</option>
              <option value="นาง">{t('common.titles.mrs')}</option>
              <option value="นางสาว">{t('common.titles.ms')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('common.form.fields.firstName')}</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t('common.form.placeholders.firstName')}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('common.form.fields.lastName')}</label>
            <Input
              value={formData.surname}
              onChange={(e) => setFormData(prev => ({ ...prev, surname: e.target.value }))}
              placeholder={t('common.form.placeholders.lastName')}
              required
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.actions.cancel')}</AlertDialogCancel>
            <Button type="submit">{t('common.actions.save')}</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Classroom: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number>(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const fetchedClasses = await ClassService.getAllClasses();
        setClasses(fetchedClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  const handleImportClick = (classId: number) => {
    setSelectedClassId(classId);
    setShowImportDialog(true);
  };

  const handleReportClick = (classId: number) => {
    setSelectedClassId(classId);
    setShowReportDialog(true);
  };

  const handleDeleteClick = (classId: number) => {
    setSelectedClassId(classId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const success = await ClassService.softDeleteClass(selectedClassId, 1); // Replace 1 with actual user ID
      if (success) {
        const updatedClasses = await ClassService.getAllClasses();
        setClasses(updatedClasses);
      }
    } catch (error) {
      console.error('Error deleting class:', error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvData = event.target?.result as string;
        const students = parseCSV(csvData);
        await handleImportStudents(students);
      } catch (error) {
        toast.error(t('classroom.errors.csvProcessing'));
      }
    };
    reader.readAsText(file);
  };

  const handleManualAdd = () => {
    setShowImportDialog(false);
    setShowAddStudentDialog(true);
  };

  const handleAddStudent = async (data: { id: string; title: string; name: string; surname: string; classId: string }) => {
    try {
      const currentUserId = 1; // TODO: Get actual current user ID from auth context
      const now = new Date();

      await ClassStudentService.createStudent(parseInt(data.classId), {
        student: {
          email: data.id,
          title: data.title,
          firstName: data.name,
          lastName: data.surname
        },
        isActive: true,
        studentUserId: parseInt(data.id), // Assuming the id is the user ID
        enrolledAt: now,
        enrolledByUserId: currentUserId,
        createdByUserId: currentUserId,
        updatedByUserId: currentUserId
      });
      setShowAddStudentDialog(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleReportSelection = (type: 'individual' | 'comparison' | 'summary') => {
    switch (type) {
      case 'individual':
        navigate(`/class/${selectedClassId}/report/individual`);
        break;
      case 'comparison':
        navigate(`/class/${selectedClassId}/report/comparison`);
        break;
      case 'summary':
        navigate(`/class/${selectedClassId}/report/summary`);
        break;
    }
    setShowReportDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('classroom.title')}</h1>
      {/* <h2 className="text-xl mb-4">{t('classroom.header.description')}</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ClassroomCard key="create-card" isCreate />
        {classes.map((classroom) => (
          <ClassroomCard
            key={`class-${classroom.classId}`}
            classroom={classroom}
            onImportClick={handleImportClick}
            onReportClick={handleReportClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>

      {/* Import Students Dialog */}
      <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('classroom.dialog.import.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('classroom.dialog.import.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {t('classroom.actions.uploadCSV')}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleManualAdd}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t('classroom.actions.addManually')}
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.actions.cancel')}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Student Dialog */}
      <AddStudentDialog
        open={showAddStudentDialog}
        onOpenChange={setShowAddStudentDialog}
        classId={selectedClassId.toString()}
        onSubmit={handleAddStudent}
      />

      {/* Report Selection Dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('classroom.dialog.report.title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('classroom.dialog.report.description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <Button
              key="individual-report"
              variant="outline"
              className="w-full"
              onClick={() => handleReportSelection('individual')}
            >
              <Users className="mr-2 h-4 w-4" />
              {t('classroom.reports.individual')}
            </Button>
            <Button
              key="comparison-report"
              variant="outline"
              className="w-full"
              onClick={() => handleReportSelection('comparison')}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              {t('classroom.reports.comparison')}
            </Button>
            <Button
              key="summary-report"
              variant="outline"
              className="w-full"
              onClick={() => handleReportSelection('summary')}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              {t('classroom.reports.summary')}
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.actions.cancel')}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('classroom.dialog.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('classroom.dialog.delete.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.actions.cancel')}</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              {t('common.actions.deleteClass')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Classroom;