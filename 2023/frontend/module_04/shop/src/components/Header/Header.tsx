import Image from 'next/future/image';
import * as S from './Header.styles';

function Header() {
  return (
    <S.Container>
      <Image
        src="/images/logo.svg"
        alt="ignite shop"
        width={130}
        height={52}
        priority
      />
    </S.Container>
  );
}

export default Header;
