import { useContext } from 'react';

// context
import {
  TransactionsContext,
  TransactionsContextData,
} from '../contexts/Transactions';

function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error('useTransactions must be used within an Transaction provider');
  }

  return context;
}

export { useTransactions };
