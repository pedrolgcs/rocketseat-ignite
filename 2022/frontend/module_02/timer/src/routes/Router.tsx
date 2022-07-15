import { Routes, Route } from 'react-router-dom'
import { Home, History } from '@/pages'

function Router() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}

export { Router }
