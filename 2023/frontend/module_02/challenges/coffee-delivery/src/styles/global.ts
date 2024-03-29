import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  body {
    background: ${(props) => props.theme.colors.neutral.gray[100]} ;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    color: ${(props) => props.theme.colors.neutral.gray[700]};
    font-weight: 400;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;

export { GlobalStyle };
