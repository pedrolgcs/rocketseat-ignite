import { Summary } from '@/components';
import { useTransactions, TransactionsProvider } from '@/contexts';
import { dateFormatter } from '@/utils/date';
import { SearchForm } from './components';
import * as S from './Transactions.styles';

function Transactions() {
  const { transactions } = useTransactions();

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

function TransactionsWithProviders() {
  return (
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>
  );
}

export default TransactionsWithProviders;
