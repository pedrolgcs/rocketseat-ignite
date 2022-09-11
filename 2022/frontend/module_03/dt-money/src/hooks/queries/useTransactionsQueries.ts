import { useQuery } from '@tanstack/react-query';
import {
  getTransactions,
  GetTransactionsParams,
} from '@/services/requests/transactions';

export function useTransactionsQueries({ filters }: GetTransactionsParams) {
  return useQuery(
    ['transactions', filters],
    async () => {
      const transactions = await getTransactions({ filters });

      return transactions;
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minute
    }
  );
}
