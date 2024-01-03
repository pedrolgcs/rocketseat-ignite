import { Helmet } from 'react-helmet-async'

import { OrdersTable } from '@/features/orders-table'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <OrdersTable />
      </div>
    </>
  )
}
