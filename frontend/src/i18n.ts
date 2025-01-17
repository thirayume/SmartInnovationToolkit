// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your JSON files directly
import translationEN from './locales/en/translation.json';
import translationTH from './locales/th/translation.json';

// Get stored language preference or use Thai as default
const storedLanguage = localStorage.getItem('language') || 'th';

export const resources = {
  en: {
    translation: translationEN
  },
  th: {
    translation: translationTH
  }
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'th',
    defaultNS: 'translation',
    lng: 'th', // Force Thai as initial language
    detection: {
      order: ['localStorage', 'queryString', 'cookie'],
      lookupLocalStorage: 'language',
      caches: ['localStorage', 'cookie'],
    },
    // Force Thai language by default
    load: 'languageOnly',
    preload: ['th'],
    // Set Thai as default if language detection fails
    nonExplicitSupportedLngs: true,
    supportedLngs: ['th', 'en'],
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  });

// Force Thai language on first load if no language is stored
if (!localStorage.getItem('language')) {
  i18n.changeLanguage('th');
  localStorage.setItem('language', 'th');
}

export default i18n;