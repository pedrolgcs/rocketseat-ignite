import type { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';

// components
import { Header } from '../components/Header';

// styles
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
