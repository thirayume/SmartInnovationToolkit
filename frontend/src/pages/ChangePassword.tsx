// src/pages/ChangePassword.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Spinner } from '../components/ui/spinner';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formData, setFormData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const validatePassword = (password: string) => {
      setValidation({
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    };

    validatePassword(formData.newPassword);
    
    // Check for password mismatch
    if (formData.confirmPassword) {
      setPasswordMismatch(formData.newPassword !== formData.confirmPassword);
    }
  }, [formData.newPassword, formData.confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all password validations pass
    const allValidationsPass = Object.values(validation).every(v => v);
    if (!allValidationsPass) {
      toast.error(t('common.form.validation.password.requirements'));
      return;
    }

    if (passwordMismatch) {
      toast.error(t('common.form.validation.password.mismatch'));
      return;
    }

    setIsLoading(true);

    try {
      // First verify current password
      const verifyResult = await api.auth.login({
        email: 'current-user-email', // You'll need to get this from your auth context
        password: formData.currentPassword
      });

      if (!verifyResult.success) {
        toast.error(t('common.form.validation.password.currentIncorrect'));
        return;
      }

      // If current password is correct, proceed with password change
      // Add your API call here to change the password
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t('common.status.success'));
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(t('common.messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('profile.changePassword.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              {t('profile.changePassword.current')}
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder={t('profile.changePassword.current')}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">
              {t('profile.changePassword.new')}
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                className={formData.newPassword && !Object.values(validation).every(v => v) ? 'border-yellow-500' : ''}
                placeholder={t('profile.changePassword.new')}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  {validation.minLength ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                  <span>{t('common.form.validation.password.minLength')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {validation.hasUpperCase ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                  <span>{t('common.form.validation.password.uppercase')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {validation.hasLowerCase ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                  <span>{t('common.form.validation.password.lowercase')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {validation.hasNumber ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                  <span>{t('common.form.validation.password.number')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {validation.hasSpecial ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                  <span>{t('common.form.validation.password.special')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t('profile.changePassword.confirm')}
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={`${passwordMismatch ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder={t('profile.changePassword.confirm')}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {passwordMismatch && (
              <p className="text-sm text-red-500">
                {t('common.form.validation.passwordMismatch')}
              </p>
            )}
          </div>

          <Button type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white"
          disabled={isLoading || passwordMismatch || !Object.values(validation).every(v => v)}>
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                {t('common.status.saving')}
              </>
            ) : t('common.actions.save')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;