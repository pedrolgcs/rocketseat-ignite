import { MapPin, ShoppingCart } from 'phosphor-react';

import * as S from './Header.styles';

function Header() {
  return (
    <S.HeaderContainer>
      <img src="/images/logo.svg" alt="coffee delivery" />

      <S.CartContainer>
        <S.Location>
          <MapPin weight="fill" size={22} />
          Porto Alegre, RS
        </S.Location>

        <S.ShoppingCartButton>
          <ShoppingCart size={22} weight="fill" />
        </S.ShoppingCartButton>
      </S.CartContainer>
    </S.HeaderContainer>
  );
}

export default Header;
