import React, { useState } from 'react';
import { UtilsContext } from './UtilContext';

export const UtilsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0); // State to trigger refetch


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  const setAppError = (errorMessage: string) => setError(errorMessage);
  const clearAppError = () => setError(null);


  // Method to trigger a refetch
  const triggerRefetch = () => {
    setRefetchKey((prev) => prev + 1);
  };


  return (
    <UtilsContext.Provider
      value={{
        theme,
        toggleTheme,
        isLoading,
        showLoader,
        hideLoader,
        error,
        setAppError,
        clearAppError,
        triggerRefetch
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};
