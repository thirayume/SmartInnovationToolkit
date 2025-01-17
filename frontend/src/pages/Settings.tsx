// src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsTable } from '../components/settings/SettingsTable';
import { AuditLog } from '../components/settings/AuditLog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card } from '../components/ui/card';
import { ApplicationSetting, SettingAudit } from '../types/settings';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Settings: React.FC = () => {
 const { t } = useTranslation();
 const [settings, setSettings] = useState<ApplicationSetting[]>([]);
 const [auditLog, setAuditLog] = useState<SettingAudit[]>([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   fetchData();
 }, []);

 const fetchData = async () => {
   try {
     const [settingsResponse, auditResponse] = await Promise.all([
       api.settings.getAll(),
       api.settings.getAuditLog()
     ]);

     setSettings(settingsResponse.data);
     setAuditLog(auditResponse.data);
   } catch (error) {
     toast.error(t('common.messages.error'));
   } finally {
     setIsLoading(false);
   }
 };

 const handleSettingUpdate = async (keyName: string, value: string, description?: string) => {
   try {
     await api.settings.update(keyName, { value, description });
     toast.success(t('common.status.success'));
     fetchData();
   } catch (error) {
     toast.error(t('common.messages.error'));
   }
 };

 return (
   <div className="space-y-6">
     <div>
       <h2 className="text-2xl font-bold tracking-tight">
         {t('settings.title')}
       </h2>
       <p className="text-muted-foreground">
         {t('settings.subtitle')}
       </p>
     </div>

     <Card>
       <Tabs defaultValue="settings">
         <TabsList>
           <TabsTrigger value="settings">
             {t('settings.tabs.general')}
           </TabsTrigger>
           <TabsTrigger value="audit">
             {t('settings.tabs.audit')}
           </TabsTrigger>
         </TabsList>
         <TabsContent value="settings">
           <SettingsTable
             settings={settings}
             isLoading={isLoading}
             onUpdate={handleSettingUpdate}
           />
         </TabsContent>
         <TabsContent value="audit">
           <AuditLog auditLog={auditLog} isLoading={isLoading} />
         </TabsContent>
       </Tabs>
     </Card>
   </div>
 );
};

export default Settings;