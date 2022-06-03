import React from 'react';

// providers
import { TransactionsProvider } from './Transactions';

const AppProvider: React.FC = ({ children }) => {
  return <TransactionsProvider>{children}</TransactionsProvider>;
};

export { AppProvider };
