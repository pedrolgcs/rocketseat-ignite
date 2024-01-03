import { Helmet } from 'react-helmet-async'

import { Dashboard } from '@/features/dashboard'

export function DashboardPage() {
  return (
    <>
      <Helmet title="Dashboard" />

      <Dashboard />
    </>
  )
}
