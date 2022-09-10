import { createContext } from 'use-context-selector';
import { Transaction } from '@/entities/transaction';
import {
  getTransactions,
  GetTransactionsParams,
  createNewTransaction,
  CreateNewTransactionParams,
} from '@/services/requests/transactions';
import * as React from 'react';

type TransactionsContextData = {
  transactions: Transaction[];
  fetchTransactions: (params: GetTransactionsParams) => Promise<void>;
  createTransaction: (params: CreateNewTransactionParams) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextData>({
  transactions: [],
  fetchTransactions: () => Promise.resolve(),
  createTransaction: () => Promise.resolve(),
});

type TransactionsProviderProps = {
  children: React.ReactNode;
};

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const fetchTransactions = React.useCallback(
    async (params: GetTransactionsParams) => {
      const response = await getTransactions(params);
      setTransactions(response);
    },
    []
  );

  const createTransaction = React.useCallback(
    async (data: CreateNewTransactionParams) => {
      const newTransaction = await createNewTransaction(data);
      setTransactions((state) => [newTransaction, ...state]);
    },
    []
  );

  React.useEffect(() => {
    fetchTransactions({});
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsProvider, TransactionsContext };
