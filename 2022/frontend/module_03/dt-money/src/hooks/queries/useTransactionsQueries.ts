import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/services/requests/transactions';

type UseTransactionsQueriesParams = {
  filters?: {
    query: string;
  };
};

export function useTransactionsQueries({
  filters,
}: UseTransactionsQueriesParams) {
  return useQuery(
    ['transactions', filters],
    async () => {
      const transactions = await getTransactions({ filters });

      return transactions;
    },
    {
      staleTime: 1000 * 60 * 1, // 1 minute
    }
  );
}
