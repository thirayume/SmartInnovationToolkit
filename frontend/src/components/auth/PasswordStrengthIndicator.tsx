import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const { t } = useTranslation();

  const requirements = [
    { 
      regex: /.{8,}/, 
      key: 'length',
      text: t('auth.passwordStrength.length') 
    },
    { 
      regex: /[A-Z]/, 
      key: 'uppercase',
      text: t('auth.passwordStrength.uppercase') 
    },
    { 
      regex: /[a-z]/, 
      key: 'lowercase',
      text: t('auth.passwordStrength.lowercase') 
    },
    { 
      regex: /[0-9]/, 
      key: 'number',
      text: t('auth.passwordStrength.number') 
    },
    { 
      regex: /[^A-Za-z0-9]/, 
      key: 'special',
      text: t('auth.passwordStrength.special') 
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">
        {t('auth.passwordStrength.title')}
      </p>
      <div className="grid gap-2">
        {requirements.map(({ regex, text, key }) => (
          <div 
            key={key} 
            className="flex items-center gap-2 text-sm"
          >
            {regex.test(password) ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-gray-300" />
            )}
            <span className={regex.test(password) ? 'text-green-500' : 'text-gray-500'}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;