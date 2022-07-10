import * as React from 'react';
import * as S from './Button.styles';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'neutral';

type ButtonProps = React.PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
  };

function Button({ variant = 'neutral', children, ...props }: ButtonProps) {
  return (
    <S.Container variant={variant} {...props}>
      {children}
    </S.Container>
  );
}

export default Button;
