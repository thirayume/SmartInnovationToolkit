// src/components/settings/AuditLog.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { SettingAudit } from '../../types/settings';
import { Skeleton } from '../ui/skeleton';

interface AuditLogProps {
  auditLog: SettingAudit[];
  isLoading: boolean;
}

export const AuditLog: React.FC<AuditLogProps> = ({ auditLog, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('settings.audit.headers.settingName')}</TableHead>
          <TableHead>{t('settings.audit.headers.previousValue')}</TableHead>
          <TableHead>{t('settings.audit.headers.newValue')}</TableHead>
          <TableHead>{t('settings.audit.headers.changedBy')}</TableHead>
          <TableHead>{t('settings.audit.headers.changedAt')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {auditLog.map((log) => (
          <TableRow key={log.audit_id}>
            <TableCell>{log.key_name}</TableCell>
            <TableCell>{log.old_value}</TableCell>
            <TableCell>{log.new_value}</TableCell>
            <TableCell>{log.changed_by_name}</TableCell>
            <TableCell>
              {new Date(log.changed_at).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex space-x-4">
        <Skeleton className="h-12 w-1/5" />
        <Skeleton className="h-12 w-1/5" />
        <Skeleton className="h-12 w-1/5" />
        <Skeleton className="h-12 w-1/5" />
        <Skeleton className="h-12 w-1/5" />
      </div>
    ))}
  </div>
);