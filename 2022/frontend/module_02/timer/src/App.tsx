import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '@/styles/global'
import { Router } from '@/routes/Router'
import { CyclesProvider } from '@/contexts'
import theme from '@/styles/themes/default'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
