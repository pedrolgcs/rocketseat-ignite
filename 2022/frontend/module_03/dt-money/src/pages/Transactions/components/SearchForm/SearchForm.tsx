import * as S from './SearchForm.styles';
import { MagnifyingGlass } from 'phosphor-react';

function SearchForm() {
  return (
    <S.SearchFormContainer>
      <input type="text" placeholder="Busque por transações" />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  );
}

export default SearchForm;
