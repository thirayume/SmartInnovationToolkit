// src/components/dashboard/QuickActions.tsx
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { User, Lock, /*Settings, Activity*/ } from 'lucide-react';
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useMockData } from '@/contexts/MockDataContext';
import { RotateCcw } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { useMockData: isMockEnabled, setUseMockData, resetMockData } = useMockData();

  const actions = [
    {
      title: t('profile.edit'),
      icon: User,
      onClick: () => navigate('/profile'),
      variant: 'default' as const
    },
    {
      title: t('profile.changePassword.title'),
      icon: Lock,
      onClick: () => navigate('/change-password'),
      variant: 'outline' as const
    },
    // {
    //   title: t('layout.menu.settings'),
    //   icon: Settings,
    //   onClick: () => navigate('/settings'),
    //   variant: 'outline' as const
    // },
    // {
    //   title: t('dashboard.actions.systemStatus'),
    //   icon: Activity,
    //   onClick: () => navigate('/status'),
    //   variant: 'outline' as const
    // }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="flex items-center justify-start space-x-2"
            onClick={action.onClick}
          >
            <action.icon className="h-4 w-4" />
            <span>{action.title}</span>
          </Button>
        ))}

        <div className="col-span-2 grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between space-x-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {t('dashboard.mockData.title')}
            </label>
            <Switch
              checked={isMockEnabled}
              onCheckedChange={setUseMockData}
              aria-label={t('dashboard.mockData.toggle')}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetMockData}
            className="flex items-center justify-start space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t('dashboard.mockData.reset')}</span>
          </Button>
          <p className="col-span-2 text-xs text-muted-foreground">
            {t('dashboard.mockData.description')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};