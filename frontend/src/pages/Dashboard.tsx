// src/pages/Dashboard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
// import { DashboardSummary } from '../components/dashboard/DashboardSummary';
import { QuickActions } from '../components/dashboard/QuickActions';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        {t('dashboard.welcome', { name: user?.firstName })}
      </h2>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardSummary />
      </div> */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-3">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;