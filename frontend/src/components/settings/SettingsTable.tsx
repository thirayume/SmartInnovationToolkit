// src/components/settings/SettingsTable.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Pencil, Save, X } from 'lucide-react';
import { ApplicationSetting } from '../../types/settings';
import { Skeleton } from '../ui/skeleton';

interface SettingsTableProps {
  settings: ApplicationSetting[];
  isLoading: boolean;
  onUpdate: (keyName: string, value: string, description?: string) => Promise<void>;
}

export const SettingsTable: React.FC<SettingsTableProps> = ({
  settings,
  isLoading,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (setting: ApplicationSetting) => {
    setEditingId(setting.setting_id);
    setEditValue(setting.value);
    setEditDescription(setting.description || '');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
    setEditDescription('');
  };

  const handleSave = async (setting: ApplicationSetting) => {
    await onUpdate(setting.key_name, editValue, editDescription);
    handleCancel();
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('settings.table.headers.keyName')}</TableHead>
          <TableHead>{t('settings.table.headers.value')}</TableHead>
          <TableHead>{t('settings.table.headers.description')}</TableHead>
          <TableHead>{t('settings.table.headers.lastUpdated')}</TableHead>
          <TableHead>{t('settings.table.headers.actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {settings.map((setting) => (
          <TableRow key={setting.setting_id}>
            <TableCell>{setting.key_name}</TableCell>
            <TableCell>
              {editingId === setting.setting_id ? (
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                setting.value
              )}
            </TableCell>
            <TableCell>
              {editingId === setting.setting_id ? (
                <Input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              ) : (
                setting.description
              )}
            </TableCell>
            <TableCell>
              {setting.updated_at ? new Date(setting.updated_at).toLocaleString() : '-'}
            </TableCell>
            <TableCell>
              {editingId === setting.setting_id ? (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleSave(setting)}
                  >
                    <Save className="h-4 w-4" title={t('settings.actions.save')} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4" title={t('settings.actions.cancel')} />
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(setting)}
                >
                  <Pencil className="h-4 w-4" title={t('settings.actions.edit')} />
                </Button>
              )}
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
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-12 w-1/4" />
        <Skeleton className="h-12 w-1/4" />
      </div>
    ))}
  </div>
);