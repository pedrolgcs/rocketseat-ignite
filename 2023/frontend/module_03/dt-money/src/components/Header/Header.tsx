import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from '@/components';
import * as S from './Header.styles';

function Header() {
  const [isOpenNewTransactionModal, setIsOpenNewTransactionModal] =
    React.useState(false);

  const toggleNewTransactionModal = () => {
    setIsOpenNewTransactionModal(!isOpenNewTransactionModal);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src="/images/logo.svg" alt="" />

        <Dialog.Root
          open={isOpenNewTransactionModal}
          onOpenChange={toggleNewTransactionModal}
        >
          <Dialog.Trigger asChild>
            <S.NewTransactionButton type="button">
              Nova transação
            </S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal toggleModal={toggleNewTransactionModal} />
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}

export default Header;
