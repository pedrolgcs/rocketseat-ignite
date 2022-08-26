import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from '@/components';
import * as S from './Header.styles';

function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src="/images/logo.svg" alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton type="button">
              Nova transação
            </S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}

export default Header;
