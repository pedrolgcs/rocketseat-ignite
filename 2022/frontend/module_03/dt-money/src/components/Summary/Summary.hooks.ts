import { TransactionsContext } from '@/contexts';
import { useContextSelector } from 'use-context-selector';
import { priceFormatter } from '@/utils/currency';

function useSummary() {
  const { transactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactions: context.transactions,
      };
    }
  );

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  const summaryAmountParsed = {
    income: priceFormatter.format(summary.income),
    outcome: priceFormatter.format(summary.outcome),
    total: priceFormatter.format(summary.total),
  };

  return {
    summary: summaryAmountParsed,
  };
}

export { useSummary };
