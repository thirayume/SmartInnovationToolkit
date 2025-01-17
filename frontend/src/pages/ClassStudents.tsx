// src/pages/ClassStudents.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Pencil, Trash2, UserPlus, FileSpreadsheet, BarChart2, ChevronLeft } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClassService, ClassStudentService } from '../services/mockService';
import { Class, ClassStudent } from '../types';
import { useNavigate } from 'react-router-dom';

interface StudentFormData {
  title: string;
  firstName: string;
  lastName: string;
}

const ClassStudents: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class | null>(null);
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<ClassStudent | null>(null);
  const [importMethod, setImportMethod] = useState<'manual' | 'csv'>('manual');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    title: '',
    firstName: '',
    lastName: ''
  });

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

  const handleOpenDialog = (student?: ClassStudent) => {
    if (student) {
      setSelectedStudent(student);
      setFormData({
        title: student.student?.title || '',
        firstName: student.student?.firstName || '',
        lastName: student.student?.lastName || ''
      });
    } else {
      setSelectedStudent(null);
      setFormData({ title: '', firstName: '', lastName: '' });
    }
    setIsDialogOpen(true);
  };

  const handleImportMethodSelect = (method: 'manual' | 'csv') => {
    setImportMethod(method);
    setIsImportDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (importMethod === 'csv' && csvFile) {
        // TODO: Implement CSV import
        const formData = new FormData();
        formData.append('file', csvFile);
        // await ClassStudentService.importFromCsv(Number(classId), formData);
      }

      await fetchStudents();
      setIsImportDialogOpen(false);
      setCsvFile(null);
    } catch (error) {
      console.error('Error importing students:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedStudent) {
        await ClassStudentService.updateStudent(
          Number(classId),
          selectedStudent.classStudentId,
          {
            ...formData,
            updatedByUserId: 1 // Replace with actual user ID from auth
          }
        );
      } else {
        await ClassStudentService.createStudent(
          Number(classId),
          {
            ...formData,
            id: 0,
            studentUserId: 1, // TODO: Replace with actual student user ID
            enrolledAt: new Date(),
            enrolledByUserId: 1, // TODO: Replace with actual user ID from auth
            isActive: true,
            createdByUserId: 1, // TODO: Replace with actual user ID from auth
            updatedByUserId: 1 // TODO: Replace with actual user ID from auth
          }
        );
      }

      setIsDialogOpen(false);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      await ClassStudentService.deleteStudent(
        Number(classId),
        selectedStudent.classStudentId
      );
      setIsDeleteDialogOpen(false);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">{t('common.states.loading')}</div>;
  }

  return (
    <div className="container mx-auto py-6">
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
          <h1 className="text-2xl font-semibold">{t('classStudents.title')} - {classData?.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/class-summary-report/${classId}`)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
          >
            <BarChart2 className="h-4 w-4" />
            {t('classStudents.report')}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t('classStudents.add')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleImportMethodSelect('manual')}>
                <UserPlus className="mr-2 h-4 w-4" />
                {t('classStudents.addManual')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleImportMethodSelect('csv')}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                {t('classStudents.importCsv')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Student list */}
      {isLoading ? (
        <div>{t('common.loading')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <Card key={student.classStudentId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="font-semibold">
                  {student.student?.title} {student.student?.firstName} {student.student?.lastName}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => navigate(`/individual-report/${student.studentUserId}`)}
                    title={t('common.actions.viewReport')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(student)}
                    title={t('common.actions.edit')}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsDeleteDialogOpen(true);
                    }}
                    title={t('common.actions.delete')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {importMethod === 'manual'
                ? t('classStudents.addManual')
                : t('classStudents.importCsv')}
            </DialogTitle>
            <DialogDescription>
              {importMethod === 'manual'
                ? t('classStudents.addManualDescription')
                : t('classStudents.importCsvDescription')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleImportSubmit}>
            {importMethod === 'manual' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">{t('common.form.fields.title')}</Label>
                  <Select
                    value={formData.title}
                    onValueChange={(value) => setFormData({ ...formData, title: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('common.form.placeholders.title')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">{t('common.titles.mr')}</SelectItem>
                      <SelectItem value="mrs">{t('common.titles.mrs')}</SelectItem>
                      <SelectItem value="ms">{t('common.titles.ms')}</SelectItem>
                      <SelectItem value="dr">{t('common.titles.dr')}</SelectItem>
                      <SelectItem value="prof">{t('common.titles.prof')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="firstName">{t('common.form.fields.firstName')}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    placeholder={t('common.form.placeholders.firstName')}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">{t('common.form.fields.lastName')}</Label>
                  <Input
                    id="lastName"
                    placeholder={t('common.form.placeholders.lastName')}
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                <p className="text-sm text-gray-500">
                  {t('classStudents.csvInstructions')}
                </p>
              </div>
            )}
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                {t('common.actions.cancel')}
              </Button>
              <Button type="submit">
                {t('common.actions.save')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Student Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedStudent ? t('student.dialog.edit.title') : t('student.dialog.add.title')}
            </DialogTitle>
            <DialogDescription>
              {selectedStudent
                ? t('student.dialog.edit.description')
                : t('student.dialog.add.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">{t('student.title')}</Label>
                <Select
                  value={formData.title}
                  onValueChange={(value) => setFormData({ ...formData, title: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('common.form.placeholders.title')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">{t('common.titles.mr')}</SelectItem>
                    <SelectItem value="mrs">{t('common.titles.mrs')}</SelectItem>
                    <SelectItem value="ms">{t('common.titles.ms')}</SelectItem>
                    <SelectItem value="dr">{t('common.titles.dr')}</SelectItem>
                    <SelectItem value="prof">{t('common.titles.prof')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="firstName">{t('student.firstName')}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t('student.lastName')}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                {t('common.actions.cancel')}
              </Button>
              <Button type="submit">
                {selectedStudent ? t('common.actions.save') : t('common.actions.add')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('classStudents.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('classStudents.delete.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {t('common.actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClassStudents;