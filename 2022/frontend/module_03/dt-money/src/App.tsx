import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import setDefaultOptions from 'date-fns/setDefaultOptions';
import ptBr from 'date-fns/locale/pt-BR';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Router } from '@/routes/Router';
import { GlobalStyle } from '@/styles/global';
import defaultTheme from '@/styles/themes/default';

// Create a client
const queryClient = new QueryClient();

function App() {
  React.useEffect(() => {
    setDefaultOptions({
      locale: ptBr,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export { App };
