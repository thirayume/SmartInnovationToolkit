// src/pages/Promotion.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Promotion: React.FC = () => {
  const { t } = useTranslation();

  const promotions = [
    {
      title: 'Early Bird Discount',
      description: 'Get 30% off for early registration',
      image: '/api/placeholder/400/200',
      link: '#'
    },
    {
      title: 'School Package',
      description: 'Special discount for schools',
      image: '/api/placeholder/400/200',
      link: '#'
    },
    {
      title: 'Teacher Training',
      description: 'Free training sessions for teachers',
      image: '/api/placeholder/400/200',
      link: '#'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Promotion */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
        <img 
          src="/api/placeholder/1200/400" 
          alt="Featured"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="text-white p-8 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{t('promotion.featured.title')}</h1>
            <p className="text-lg mb-6">{t('promotion.featured.description')}</p>
            <Button className="bg-blue-500 hover:bg-blue-600">
              {t('promotion.learnMore')}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Promotion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={promo.image} 
              alt={promo.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
              <p className="text-gray-600 mb-4">{promo.description}</p>
              <Button variant="outline" className="w-full">
                {t('promotion.learnMore')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">{t('promotion.contact.title')}</h2>
        <p className="text-gray-600 mb-6">{t('promotion.contact.description')}</p>
        <Button className="bg-green-500 hover:bg-green-600">
          {t('promotion.contact.button')}
        </Button>
      </div>
    </div>
  );
};

export default Promotion;