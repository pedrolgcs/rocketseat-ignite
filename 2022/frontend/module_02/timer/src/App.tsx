import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '@/styles/global'
import theme from '@/styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
