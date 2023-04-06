import { createContext } from 'use-context-selector';
import * as React from 'react';

type TransactionsContextData = {
  query: string;
  updateQuery: (value: string) => void;
};

const TransactionsContext = createContext<TransactionsContextData>({
  query: '',
  updateQuery: () => {},
});

type TransactionsProviderProps = {
  children: React.ReactNode;
};

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [query, setQuery] = React.useState('');

  const updateQuery = React.useCallback((data: string) => {
    setQuery(data);
  }, []);

  return (
    <TransactionsContext.Provider value={{ query, updateQuery }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsProvider, TransactionsContext };
