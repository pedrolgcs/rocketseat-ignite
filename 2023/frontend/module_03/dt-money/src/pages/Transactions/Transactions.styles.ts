import styled, { css } from 'styled-components';

export const TransactionsContainer = styled.main`
  margin-top: -5rem;
`;

export const TransactionsContent = styled.div`
  margin: 4rem auto 0;
  width: 100%;
  max-width: 70rem;
  padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme.colors.gray[700]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      width: 50%;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

type PriceHightLightProps = {
  variant: 'income' | 'outcome';
};

export const PriceHightLight = styled.span<PriceHightLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme.colors.green[300]
      : props.theme.colors.red[300]};

  &::before {
    ${(props) => css`
      content: '${props.variant === 'outcome' ? '-' : ''}';
    `};

    ${(props) => css`
      margin-right: ${props.variant === 'outcome' ? '5px' : ''};
    `};
  }
`;
