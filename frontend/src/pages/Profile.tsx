// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import dataService from '@/services/dataService';

interface ProfileData {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  institution: string;
  province: string;
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProfileData>({
    title: user?.title || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    institution: user?.institution || '',
    province: user?.province || ''
  });

  useEffect(() => {
    if (user) {
      // Ensure all fields have at least empty string values
      const userData = {
        title: user.title || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        email: user.email || '',
        institution: user.institution || '',
        province: user.province || ''
      };
      setFormData(userData);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiData = {
        title: formData.title,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        institution: formData.institution,
        province: formData.province
      };

      const response = await dataService.profile.update(apiData);
      
      if (response.success) {
        setError(null);
        toast.success(t('profile.updateSuccess'));
        // Update local user data using AuthContext
        updateUser({
          ...response.data,
          firstName: response.data.first_name,
          lastName: response.data.last_name
        });
      } else {
        setError(response.error || t('profile.updateError'));
        toast.error(response.error || t('profile.updateError'));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('profile.updateError');
      setError(errorMessage);
      console.error('Profile update error:', error);
      toast.error(t('profile.updateError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <Spinner size="lg" className="flex justify-center items-center h-screen" />;
  }

  const inputClassName = "h-12 w-full";
  const formGroupClassName = "space-y-2";

  return (
    <div className="container mx-auto w-[85%] lg:w-[80%] p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
      </div>
      <Card className="w-full">
        <CardHeader className="space-y-2 p-6">
          <CardDescription className="text-base text-center">
            {t('profile.subtitle')}
          </CardDescription>
          {error && (
            <div className="text-red-500 text-center mt-2">
              {error}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="space-y-6">
                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.title')}</Label>
                  <Select
                    value={formData.title}
                    onValueChange={(value) => handleInputChange('title', value)}
                  >
                    <SelectTrigger className={inputClassName}>
                      <SelectValue placeholder={t('common.form.placeholders.title')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr.">{t('common.titles.mr')}</SelectItem>
                      <SelectItem value="Mrs.">{t('common.titles.mrs')}</SelectItem>
                      <SelectItem value="Ms.">{t('common.titles.ms')}</SelectItem>
                      <SelectItem value="Dr.">{t('common.titles.dr')}</SelectItem>
                      <SelectItem value="Prof.">{t('common.titles.prof')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.email')}</Label>
                  <Input
                    type="email"
                    name="email"
                    className={inputClassName}
                    placeholder={t('common.form.placeholders.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>

                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.institution')}</Label>
                  <Input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className={inputClassName}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.firstName')}</Label>
                  <Input
                    type="text"
                    name="firstName"
                    className={inputClassName}
                    placeholder={t('common.form.placeholders.firstName')}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.phone')}</Label>
                  <Input
                    type="tel"
                    name="phone"
                    className={inputClassName}
                    placeholder={t('common.form.placeholders.phone')}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.province')}</Label>
                  <Input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className={inputClassName}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.lastName')}</Label>
                  <Input
                    type="text"
                    name="lastName"
                    className={inputClassName}
                    placeholder={t('common.form.placeholders.lastName')}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={formGroupClassName}>
                  <Label>&nbsp;</Label>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(inputClassName, "bg-orange-300 hover:bg-orange-400")}
                    onClick={() => navigate('/change-password')}
                  >
                    {t('profile.changePassword.title')}
                  </Button>
                </div>

                <div className={formGroupClassName}>
                  <Label>&nbsp;</Label>
                  <Button
                    type="submit"
                    className={cn(inputClassName, "bg-green-600 hover:bg-green-700")}
                    disabled={isLoading}
                  >
                    {isLoading ? t('common.actions.saving') : t('common.actions.save')}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  );
};

export default Profile;