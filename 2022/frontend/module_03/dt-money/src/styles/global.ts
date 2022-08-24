import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.green[500]};
  }

  body {
    background: ${(props) => props.theme.colors.gray[800]};
    color: ${(props) => props.theme.colors.gray[100]};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;

export { GlobalStyle };
