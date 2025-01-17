import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, CheckCircle2, MailIcon } from 'lucide-react';

interface VerificationProps {
  email: string;
  token?: string;
}

const EmailVerification: React.FC<VerificationProps> = ({ email, token }) => {
  const { t } = useTranslation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string>('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setIsVerifying(true);
    try {
      const response = await fetch('https://localhost:8000/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setIsVerified(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerification = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch('https://localhost:8000/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend verification email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerified) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <CardTitle>{t('auth.verification.emailVerified')}</CardTitle>
            <Button 
              onClick={() => window.location.href = '/login'}
            >
              {t('auth.login.title')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('auth.verification.email')}</CardTitle>
        <CardDescription>
          {t('auth.verification.emailSent')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center text-center space-y-4">
          <MailIcon className="h-12 w-12 text-primary" />
          <p className="text-sm text-muted-foreground">
            {email}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            onClick={resendVerification}
            disabled={isVerifying}
          >
            {t('auth.verification.resend')}
          </Button>
          <Button
            variant="link"
            onClick={() => window.location.href = '/login'}
          >
            {t('auth.login.title')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerification;