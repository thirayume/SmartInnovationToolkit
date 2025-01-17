import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface MockDataContextType {
  useMockData: boolean;
  setUseMockData: (value: boolean) => void;
  resetMockData: () => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [useMockData, setUseMockData] = useLocalStorage('useMockData', true);

  const resetMockData = () => {
    // Clear all mock data from localStorage
    const keysToKeep = ['token', 'userData', 'useMockData']; // Keep authentication and settings
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    // Reload the page to reset all states
    window.location.reload();
  };

  return (
    <MockDataContext.Provider value={{ useMockData, setUseMockData, resetMockData }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
