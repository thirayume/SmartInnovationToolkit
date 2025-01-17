import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Spinner } from '../ui/spinner';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto w-[85%] md:w-[60%] p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <CardTitle className="text-xl">
                {t('auth.forgotPassword.checkEmail')}
              </CardTitle>
              <CardDescription className="text-base">
                {t('auth.forgotPassword.emailSent')} {email}
              </CardDescription>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="mt-4 h-12 text-lg min-w-[200px]"
              >
                {t('auth.forgotPassword.backToLogin')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-[85%] md:w-[60%] p-4">
      <Card>
        <CardHeader className="space-y-2 p-6">
          <CardTitle className="text-2xl text-center">
            {t('auth.forgotPassword.title')}
          </CardTitle>
          <CardDescription className="text-base text-center">
            {t('auth.forgotPassword.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-base">
                {t('common.form.fields.email')}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-12"
                placeholder={t('common.form.placeholders.email')}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spinner size="sm" className="mr-2" />
                  {t('common.actions.loading')}
                </div>
              ) : (
                t('common.actions.submit')
              )}
            </Button>

            <div className="flex justify-center">
              <Button 
                variant="link" 
                onClick={() => navigate('/login')}
                className="text-base"
              >
                {t('auth.forgotPassword.backToLogin')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;