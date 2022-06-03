import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

// styles
import '../styles/global.scss';

// Providers
import { AppProvider } from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Toaster />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
