// src/context/UtilsContext/useUtils.ts
import { useContext } from 'react';
import { UtilsContext } from './UtilContext';
import * as Toast from "@radix-ui/react-toast";

// Define context types
interface ToastContextProps {
  showToast: (type: "success" | "error", message: string) => void;
}


export const useUtils = () => {
  const context = useContext(UtilsContext);

  if (!context) {
    throw new Error('useUtils must be used within a UtilsProvider');
  }

  return context;
};
