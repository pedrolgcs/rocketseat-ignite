// assets
import logoImg from '../../assets/logo.svg';

// styles
import * as Style from './styles';

// types
type HeaderProps = {
  onOpenNewTransactionModal: () => void;
};

function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Style.Container>
      <Style.Content>
        <img src={logoImg} alt="dtmoney" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Style.Content>
    </Style.Container>
  );
}

export { Header };
