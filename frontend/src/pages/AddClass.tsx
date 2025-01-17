// src/pages/AddClass.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ClassService } from '../services/mockService';

interface ClassFormData {
  title: string;
  subtitle: string;
}

const AddClass: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClassFormData>({
    title: '',
    subtitle: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await ClassService.createClass({
        ...formData,
        isActive: true,
        createdByUserId: 1, // Replace with actual user ID from auth
        updatedByUserId: 1
      });
      
      navigate(`/class/${result.classId}/students`);
    } catch (error) {
      console.error('Error creating class:', error);
      // Add error handling/notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">{t('classroom.create')}</h1>
          <p className="text-gray-600">{t('classroom.createDesc')}</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t('classroom.form.title')}</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
                placeholder={t('classroom.form.titlePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">{t('classroom.form.subtitle')}</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  subtitle: e.target.value
                }))}
                placeholder={t('classroom.form.subtitlePlaceholder')}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/classroom')}
            >
              {t('common.actions.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {isSubmitting ? t('common.status.saving') : t('common.actions.save')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddClass;