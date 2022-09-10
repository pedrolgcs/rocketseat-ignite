import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import * as Dialog from '@radix-ui/react-dialog';
import { TransactionsContext } from '@/contexts';
import { useContextSelector } from 'use-context-selector';
import * as S from './NewTransactionModal.styles';

const newTransactionSchema = zod.object({
  description: zod.string().min(1, 'Informa uma descrição'),
  price: zod.number().min(1, 'Informa um valor'),
  category: zod.string().min(1, 'Informe uma categoria'),
  type: zod.enum(['income', 'outcome'], {
    required_error: 'Selecione um tipo',
  }),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionSchema>;

type NewTransactionModalProps = {
  toggleModal: () => void;
};

function NewTransactionModal({ toggleModal }: NewTransactionModalProps) {
  const { createTransaction } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        createTransaction: context.createTransaction,
      };
    }
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      description: '',
      category: '',
      price: 0,
      type: 'income',
    },
  });

  const handleCreateNewTransaction: SubmitHandler<
    NewTransactionFormInputs
  > = async (data) => {
    await createTransaction(data);

    reset();

    toggleModal();
  };

  return (
    <Dialog.Portal>
      <S.Overlay />
      <S.Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            id="description"
            type="text"
            placeholder="Descrição"
            {...register('description')}
          />
          <label htmlFor="description">{errors.description?.message}</label>

          <input
            type="number"
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
          />
          <label htmlFor="price">{errors.price?.message}</label>

          <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
          />
          <label htmlFor="category">{errors.category?.message}</label>

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <S.TransactionType onValueChange={onChange} value={value}>
                <S.TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </S.TransactionTypeButton>

                <S.TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </S.TransactionTypeButton>
              </S.TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </S.Content>
    </Dialog.Portal>
  );
}

export default NewTransactionModal;
