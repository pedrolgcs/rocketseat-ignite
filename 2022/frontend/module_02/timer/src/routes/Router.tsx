import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '@/layouts'
import { Home, History } from '@/pages'
import { CyclesProvider } from '@/contexts'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={
            <CyclesProvider>
              <Home />
            </CyclesProvider>
          }
        />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}

export { Router }
