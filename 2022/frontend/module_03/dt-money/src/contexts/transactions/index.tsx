import { Transaction } from '@/entities/transaction';
import {
  getTransactions,
  GetTransactionsParams,
} from '@/services/requests/transactions';
import * as React from 'react';

type TransactionsContextData = {
  transactions: Transaction[];
  fetchTransactions: (params: GetTransactionsParams) => Promise<void>;
};

const TransactionsContext = React.createContext<TransactionsContextData>({
  transactions: [],
  fetchTransactions: () => Promise.resolve(),
});

type TransactionsProviderProps = {
  children: React.ReactNode;
};

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  async function fetchTransactions(params: GetTransactionsParams) {
    const response = await getTransactions(params);
    setTransactions(response);
  }

  React.useEffect(() => {
    fetchTransactions({});
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

function useTransactions() {
  const context = React.useContext(TransactionsContext);

  if (!context) {
    throw new Error('useCycles must be used within an Cycles provider');
  }

  return context;
}

export { TransactionsProvider, useTransactions };
