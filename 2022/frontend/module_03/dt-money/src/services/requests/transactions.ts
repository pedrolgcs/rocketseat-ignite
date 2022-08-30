import { Transaction } from '@/entities/transaction';
import { serverAxiosInstance } from '@/services/api';

type GetTransactionsResponse = {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}[];

export type GetTransactionsParams = {
  filters?: {
    query: string;
  };
};

export async function getTransactions({ filters }: GetTransactionsParams) {
  const { data: transactions } =
    await serverAxiosInstance.get<GetTransactionsResponse>('/transactions', {
      params: { q: filters?.query },
    });

  const normalizedTransactions = transactions.map(
    (transaction) => new Transaction(transaction)
  );

  return normalizedTransactions;
}
