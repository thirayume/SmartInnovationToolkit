// src/hooks/useServiceWorker.ts
import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/serviceWorker.js', {
          type: 'module',
          scope: '/'
        })
        .then((registration) => {
          // Service worker registered successfully
        })
        .catch((error) => {
          // Service worker registration failed
        });
    }
  }, []);
};