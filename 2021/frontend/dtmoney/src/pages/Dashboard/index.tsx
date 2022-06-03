import { useState } from 'react';

// components
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';

// components
import { TransactionTable } from '../../components/TransactionTable';
import { NewTransactionModal } from '../../components/NewTransactionModal';

// styles
import * as Style from './styles';

function Dashboard() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Style.Container>
        <Summary />
        <TransactionTable />
      </Style.Container>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}

export { Dashboard };
