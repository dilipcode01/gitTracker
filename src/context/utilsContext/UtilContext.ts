// src/context/UtilsContext/UtilsContext.ts
import { createContext } from 'react';

// Define the shape of our context state
export interface UtilsContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  error: string | null;
  setAppError: (errorMessage: string) => void;
  clearAppError: () => void;
  triggerRefetch: () => void; // Add this method
}

// Create the context with a default type
export const UtilsContext = createContext<UtilsContextType | undefined>(undefined);
