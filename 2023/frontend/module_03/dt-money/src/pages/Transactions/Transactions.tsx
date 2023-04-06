import { Summary } from '@/components';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '@/contexts';
import { dateFormatter } from '@/utils/date';
import { useTransactionsQueries } from '@/hooks/queries';
import { SearchForm } from './components';
import * as S from './Transactions.styles';

function Transactions() {
  const { query } = useContextSelector(TransactionsContext, (context) => {
    return {
      query: context.query,
    };
  });

  const { data: transactions } = useTransactionsQueries({ query });

  return (
    <S.TransactionsContainer>
      <Summary />

      <S.TransactionsContent>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            {transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>
                  <S.PriceHightLight variant={transaction.type}>
                    {transaction.formattedPrice}
                  </S.PriceHightLight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(transaction.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContent>
    </S.TransactionsContainer>
  );
}

export default Transactions;
