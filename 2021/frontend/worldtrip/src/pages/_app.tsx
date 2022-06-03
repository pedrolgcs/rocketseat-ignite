import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../styles/slider.scss';
import { theme } from '../styles/theme';

// components
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
