import { useState, FormEvent } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

// hooks
import { useTransactions } from '../../hooks/useTransactions';

// assets
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

// styles
import * as Style from './styles';

// types
type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

type TransactionType = 'deposit' | 'withdraw';

function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TransactionType>('deposit');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    try {
      await createTransaction({
        title,
        type,
        value,
        category,
      });

      toast.success('Transação cadastrada!');

      setTitle('');
      setValue(0);
      setCategory('');
      setType('deposit');

      onRequestClose();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cadastrar transação!');
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      appElement={document.getElementById('root') as HTMLElement}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Style.Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />

        <Style.TransactionTypeContainer>
          <Style.RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </Style.RadioBox>

          <Style.RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </Style.RadioBox>
        </Style.TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Style.Container>
    </Modal>
  );
}

export { NewTransactionModal };
