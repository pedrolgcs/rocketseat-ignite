// styles
import * as Style from './styles';

// hooks
import { useTransactions } from '../../hooks/useTransactions';

// utils
import { Formatters } from '../../utils/Formatters';

function TransactionTable() {
  const { transactions } = useTransactions();

  return (
    <Style.Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {Formatters.currency(transaction.value)}
              </td>
              <td>{transaction.category}</td>
              <td>{Formatters.date(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Style.Container>
  );
}

export { TransactionTable };
