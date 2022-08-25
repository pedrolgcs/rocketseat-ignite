import { Summary } from '@/components';
import {SearchForm} from './components';
import * as S from './Transactions.styles';

function Transactions() {
  return (
    <S.TransactionsContainer>
      <Summary />

      <S.TransactionsContent>
        <SearchForm />
        
        <S.TransactionsTable>
          <tbody>
            <tr>
              <td>Desenvolvimento de site</td>
              <td>
                <S.PriceHightLight variant="income">
                  R$ 12.000,00
                </S.PriceHightLight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>

            <tr>
              <td>Hamburger</td>
              <td>
                <S.PriceHightLight variant="outcome">
                  - R$ 59,00
                </S.PriceHightLight>
              </td>
              <td>Alimentação</td>
              <td>10/04/2022</td>
            </tr>
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContent>
    </S.TransactionsContainer>
  );
}

export default Transactions;
