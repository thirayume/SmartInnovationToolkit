// src/components/auth/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Spinner } from '../ui/spinner';
import api, { RegisterData } from '../../services/api';
import { toast } from 'react-hot-toast';

interface PasswordValidation {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [validation, setValidation] = useState<PasswordValidation>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });
 
  const [formData, setFormData] = useState<RegisterData>({
    title: '',
    first_name: '',
    last_name: '', 
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    institution: '',
    province: ''
  });

  const inputClassName = "h-12 w-full";
  const formGroupClassName = "space-y-2";

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

    validatePassword(formData.password);
    
    // Check for password mismatch
    if (formData.confirm_password) {
      setPasswordMismatch(formData.password !== formData.confirm_password);
    }
  }, [formData.password, formData.confirm_password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all password validations pass
    const allValidationsPass = Object.values(validation).every(v => v);
    if (!allValidationsPass) {
      toast.error(t('common.form.validation.password.requirements'));
      return;
    }

    setIsLoading(true);
 
    try {
      if (formData.password !== formData.confirm_password) {
        toast.error(t('common.form.validation.passwordMismatch'));
        return;
      }
 
      const result = await api.auth.register(formData);
      if (result.success) {
        toast.success(t('common.status.success'));
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(result.error || t('common.messages.error'));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('common.messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const ValidationItem = ({ checked, text }: { checked: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {checked ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className={checked ? 'text-green-500' : 'text-red-500'}>{text}</span>
    </div>
  );

  return (
    <div className="container mx-auto w-[85%] lg:w-[80%] p-4">
      <Card className="w-full">
        <CardHeader className="space-y-2 p-6">
          <CardTitle className="text-2xl text-center">{t('auth.register.title')}</CardTitle>
          <CardDescription className="text-base text-center">
            {t('auth.register.subtitle')}
          </CardDescription>
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
                    className="h-10"
                    placeholder={t('common.form.placeholders.email')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.password')}</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="h-10 pr-10"
                      placeholder={t('common.form.placeholders.password')}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {/* Password Validation */}
                  {formData.password && (
                    <div className="mt-2 space-y-1 bg-gray-50 p-3 rounded-md">
                      <h3 className="text-base font-semibold mb-2">
                        {t('common.form.validation.password.requirements')}
                      </h3>
                      <ValidationItem checked={validation.minLength} text={t('common.form.validation.password.minLength')} />
                      <ValidationItem checked={validation.hasUpperCase} text={t('common.form.validation.password.uppercase')} />
                      <ValidationItem checked={validation.hasLowerCase} text={t('common.form.validation.password.lowercase')} />
                      <ValidationItem checked={validation.hasNumber} text={t('common.form.validation.password.number')} />
                      <ValidationItem checked={validation.hasSpecial} text={t('common.form.validation.password.special')} />
                    </div>
                  )}
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <div>
                  <Label>{t('common.form.fields.firstName')}</Label>
                  <Input
                    name="first_name"
                    className="h-10"
                    placeholder={t('common.form.placeholders.firstName')}
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('common.form.fields.institution')}</Label>
                  <Input
                    type="text"
                    name="institution"
                    placeholder={t('common.form.placeholders.institution')}
                    value={formData.institution}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={formGroupClassName}>
                  <Label>{t('common.form.fields.confirmPassword')}</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      className={`h-10 pr-10 ${passwordMismatch ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder={t('common.form.placeholders.confirmPassword')}
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordMismatch && (
                    <p className="text-sm text-red-500 mt-1">
                      {t('common.form.validation.passwordMismatch')}
                    </p>
                  )}
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                <div>
                  <Label>{t('common.form.fields.lastName')}</Label>
                  <Input
                    name="last_name"
                    className="h-10"
                    placeholder={t('common.form.placeholders.lastName')}
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('common.form.fields.province')}</Label>
                  <Input
                    type="text"
                    name="province"
                    placeholder={t('common.form.placeholders.province')}
                    value={formData.province}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label>{t('common.form.fields.phone')}</Label>
                  <Input
                    name="phone"
                    className="h-10"
                    placeholder={t('common.form.placeholders.phone')}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {t('auth.register.hasAccount')} <a href="/login" className="text-primary hover:underline">{t('auth.register.login')}</a>
              </p>
              <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600 text-white">
                {isLoading ? <Spinner className="mr-2" /> : null}
                {isLoading ? t('common.actions.loading') : t('common.actions.submit')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;