import * as React from 'react';
import * as S from './Header.styles';

function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src="/images/logo.svg" alt="" />
        <S.NewTransactionButton type="button">Nova transação</S.NewTransactionButton>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}

export default Header;
