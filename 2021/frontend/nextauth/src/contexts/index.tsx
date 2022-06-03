import React from 'react';

// contexts
import { AuthProvider } from './AuthContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
};

export { AppProvider }
