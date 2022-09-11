import 'styled-components';
import theme from '@/styles/themes/default';

type Theme = typeof theme;
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
