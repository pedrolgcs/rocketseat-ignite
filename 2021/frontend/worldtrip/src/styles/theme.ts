import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {},
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.700',
      },
    },
  },
});

export { theme };
