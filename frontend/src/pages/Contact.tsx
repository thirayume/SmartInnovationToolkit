// src/pages/Contact.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <h1 className="text-3xl font-bold mb-2">{t('layout.footer.contacts')}</h1>
            <p className="text-gray-600">{t('layout.footer.contact.subtitle')}</p>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>{t('layout.footer.contact.description')}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href={`tel:${t('layout.footer.contact.phone')}`}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                {t('layout.footer.contact.phone')}
              </CardContent>
            </Card>
          </a>

          {/* <a href={`tel:${t('layout.footer.contact.phone')}`}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                {t('layout.footer.contact.phone')}
              </CardContent>
            </Card>
          </a> */}

          <a href={`mailto:${t('layout.footer.contact.email')}`}>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                {t('layout.footer.contact.email')}
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;