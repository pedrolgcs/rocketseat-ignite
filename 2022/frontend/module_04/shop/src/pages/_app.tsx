import 'keen-slider/keen-slider.min.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components';
import { DefaultLayout } from '@/layouts';
import { globalStyles } from '@/styles/global';

// inicialize global style
globalStyles();

// react-query client
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout>
        <Header />
        <Component {...pageProps} />
        <Toaster />
      </DefaultLayout>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
