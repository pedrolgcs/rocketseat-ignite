import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// services
import { makeServer } from '../services/mirage';
import { queryClient } from '../services/queryClient';

// provides
import { GlobalProviders } from '../contexts';

// styles
import { theme } from '../styles/theme';

// inicialize mirageJS
if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProviders>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </GlobalProviders>
  );
}
export default MyApp;
