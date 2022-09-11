import { MagnifyingGlass } from 'phosphor-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '@/contexts';
import * as S from './SearchForm.styles';

const searchFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

function SearchForm() {
  const { updateQuery } = useContextSelector(TransactionsContext, (context) => {
    return {
      updateQuery: context.updateQuery,
    };
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransactions: SubmitHandler<SearchFormInputs> = async (
    data
  ) => {
    updateQuery(data.query);
  };

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  );
}

export default SearchForm;
