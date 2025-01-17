// src/components/common/LanguageSwitcher.tsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  // Ensure Thai is set as default on component mount
  useEffect(() => {
    const currentLang = localStorage.getItem('language');
    if (!currentLang) {
      i18n.changeLanguage('th');
      localStorage.setItem('language', 'th');
    }
  }, [i18n]);

  const languages = [
    { code: 'th', name: t('layout.language.th') },    // Thai first
    { code: 'en', name: t('layout.language.en') }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('layout.language.title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer ${
              i18n.language === language.code ? 'bg-accent' : ''
            }`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;