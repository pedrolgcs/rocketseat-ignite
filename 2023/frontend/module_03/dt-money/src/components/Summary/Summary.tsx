import * as React from 'react';
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { priceFormatter } from '@/utils/currency';
import { useTransactionsQueries } from '@/hooks/queries';
import * as S from './Summary.styles';

function Summary() {
  const { data: transactions } = useTransactionsQueries({});

  const summary = React.useMemo(() => {
    return (
      transactions?.reduce(
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
      ) || {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);

  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleDown size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.SummaryCard>

      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleUp size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </S.SummaryCard>

      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}

export default Summary;
