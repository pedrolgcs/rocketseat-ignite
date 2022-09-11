import { useQuery } from '@tanstack/react-query';
import {
  getTransactions,
  GetTransactionsParams,
} from '@/services/requests/transactions';

export function useTransactionsQueries({ query = '' }: GetTransactionsParams) {
  return useQuery(
    ['transactions', query],
    async () => {
      const transactions = await getTransactions({ query });

      return transactions;
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minute
    }
  );
}
