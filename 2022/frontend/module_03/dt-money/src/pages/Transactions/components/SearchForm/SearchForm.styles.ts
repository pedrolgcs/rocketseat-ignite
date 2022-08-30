import styled from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme.colors.gray[900]};
    color: ${(props) => props.theme.colors.gray[300]};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.colors.gray[500]};
    }
  }

  button {
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme.colors.green[300]};
    color: ${(props) => props.theme.colors.green[300]};
    font-weight: bold;
    border-radius: 6px;
    transition: background 0.3s, color 0.3s, border-color 0.3s;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    &:not(:disabled):hover {
      background: ${(props) => props.theme.colors.green[500]};
      border: 1px solid ${(props) => props.theme.colors.green[500]};
      color: ${(props) => props.theme.colors.white};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;
