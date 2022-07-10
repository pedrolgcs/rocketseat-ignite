import styled, { css } from 'styled-components';
import { Variant } from './Button';

type ContainerProps = {
  variant: Variant;
};

export const Container = styled.button<ContainerProps>`
  width: 100px;
  height: 40px;
  color: #fff;
  background-color: ${({ theme, variant }) => theme.colors[variant]};
`;
