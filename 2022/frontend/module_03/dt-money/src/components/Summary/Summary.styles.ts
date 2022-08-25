import styled, { css } from 'styled-components';

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

type SummaryCardProps = {
  variant?: 'green';
};

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme.colors.gray[600]};
  border-radius: 6px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.gray[300]};
  }

  strong {
    display: block;
    font-size: 2rem;
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme.colors.green[700]};
    `}
`;
