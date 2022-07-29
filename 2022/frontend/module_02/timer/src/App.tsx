import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import setDefaultOptions from 'date-fns/setDefaultOptions'
import ptBr from 'date-fns/locale/pt-BR'
import { GlobalStyle } from '@/styles/global'
import { Router } from '@/routes/Router'
import { CyclesProvider } from '@/contexts'
import theme from '@/styles/themes/default'

function App() {
  React.useEffect(() => {
    setDefaultOptions({
      locale: ptBr,
    })
  }, [])

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
