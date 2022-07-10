import { ThemeProvider } from 'styled-components';
import { Button } from '@/common/components';
import theme from '@/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary">Enviar</Button>
      <Button variant="secondary">Enviar</Button>
      <Button variant="danger">Enviar</Button>
      <Button variant="success">Enviar</Button>
      <Button>Enviar</Button>
    </ThemeProvider>
  );
}

export default App;
