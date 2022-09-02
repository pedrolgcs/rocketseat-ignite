import { Transaction, ITransaction } from '@/entities/transaction';
import { serverAxiosInstance } from '@/services/api';

export type GetTransactionsParams = {
  filters?: {
    query: string;
  };
};

export async function getTransactions({ filters }: GetTransactionsParams) {
  const { data: transactions } = await serverAxiosInstance.get<ITransaction[]>(
    '/transactions',
    {
      params: { _sort: 'createdAt', _order: 'desc', q: filters?.query },
    }
  );

  const normalizedTransactions = transactions.map(
    (transaction) => new Transaction(transaction)
  );

  return normalizedTransactions;
}

export type CreateNewTransactionParams = {
  description: string;
  category: string;
  price: number;
  type: 'income' | 'outcome';
};

export async function createNewTransaction(data: CreateNewTransactionParams) {
  const newTransaction = {
    ...data,
    createdAt: new Date(),
  };

  const { data: transaction } = await serverAxiosInstance.post<ITransaction>(
    '/transactions',
    newTransaction
  );

  return new Transaction(transaction);
}
