// src/components/dashboard/DashboardSummary.tsx
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTranslation } from 'react-i18next';
import { Users, UserCheck, Clock, Activity } from 'lucide-react';

export const DashboardSummary: React.FC = () => {
  const { t } = useTranslation();

  const summaryItems = [
    {
      title: t('dashboard.summary.totalUsers'),
      value: '1,234',
      icon: Users,
      trend: '+12%',
      trendUp: true
    },
    {
      title: t('dashboard.summary.activeUsers'),
      value: '856',
      icon: UserCheck,
      trend: '+5%',
      trendUp: true
    },
    {
      title: t('dashboard.summary.pendingVerifications'),
      value: '23',
      icon: Clock,
      trend: '-2%',
      trendUp: false
    },
    {
      title: t('dashboard.summary.todayActivity'),
      value: '156',
      icon: Activity,
      trend: '+8%',
      trendUp: true
    }
  ];

  return (
    <>
      {summaryItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className={`text-xs ${item.trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {t('dashboard.summary.trend', { value: item.trend })}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};