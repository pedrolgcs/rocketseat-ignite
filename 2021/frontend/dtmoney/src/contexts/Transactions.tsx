import { createContext, useState, useEffect, ReactNode } from 'react';
import { nanoid } from 'nanoid';

// services
import { api } from '../services/api';

type Transaction = {
  id: string;
  title: string;
  value: number;
  category: string;
  type: 'deposit' | 'withdraw';
  createdAt: string;
};

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

export type TransactionsContextData = {
  transactions: Transaction[];
  createTransaction: (data: TransactionInput) => Promise<void>;
};

type TransactionsProviderProps = {
  children: ReactNode;
};

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      const { data } = await api.get('/transactions');

      setTransactions(data.transactions);
    }

    loadTransactions();
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const data = {
      id: nanoid(),
      ...transactionInput,
      createdAt: new Date(),
    };

    const response = await api.post('/transactions', data);
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsContext, TransactionsProvider };
