import * as React from 'react';
import * as S from './Default.styles';

type DefaultLayoutProps = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  return <S.Container>{children}</S.Container>;
}

export default DefaultLayout;
