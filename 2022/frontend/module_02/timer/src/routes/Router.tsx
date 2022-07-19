import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '@/layouts'
import { Home, History } from '@/pages'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}

export { Router }
