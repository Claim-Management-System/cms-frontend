import React, { createContext, useContext, useState, type ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { type AlertProps } from '@mui/material/Alert';

type ErrorContextType = {
  setError: (message: string) => void;
  clearError: () => void;
};


const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props, ref ) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setErrorState] = useState<string | null>(null);

  const setError = (message: string) => setErrorState(message);
  const clearError = () => setErrorState(null);

  return (
    <ErrorContext.Provider value={{ setError, clearError }}>
      {children}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={clearError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
};


export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  
  return context;
};