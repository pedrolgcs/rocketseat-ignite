import React from 'react';

// contexts
import { MoviesProvider } from './MoviesContext';

const AppProvider: React.FC = ({ children }) => {
  return <MoviesProvider>{children}</MoviesProvider>;
};

export { AppProvider };
