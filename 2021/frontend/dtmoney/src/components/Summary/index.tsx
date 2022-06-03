// styles
import * as Style from './styles';

// hooks
import { useTransactions } from '../../hooks/useTransactions';

// utils
import { Formatters } from '../../utils/Formatters';

// assets
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      switch (transaction.type) {
        case 'deposit':
          acc.deposits += transaction.value;
          acc.total += transaction.value;
          break;
        case 'withdraw':
          acc.withdraws += transaction.value;
          acc.total -= transaction.value;
          break;
        default:
          break;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Style.Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{Formatters.currency(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{Formatters.currency(summary.withdraws)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{Formatters.currency(summary.total)}</strong>
      </div>
    </Style.Container>
  );
}

export { Summary };
