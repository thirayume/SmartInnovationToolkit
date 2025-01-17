// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MockDataProvider } from './contexts/MockDataContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import { useServiceWorker } from './hooks/useServiceWorker';

const App: React.FC = () => {
  useServiceWorker();

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <Router>  {/* Router needs to wrap AuthProvider */}
          <AuthProvider>
            <MockDataProvider>
              <AppRoutes />
            </MockDataProvider>
          </AuthProvider>
        </Router>
      </I18nextProvider>
    </ErrorBoundary>
  );
};

export default App;