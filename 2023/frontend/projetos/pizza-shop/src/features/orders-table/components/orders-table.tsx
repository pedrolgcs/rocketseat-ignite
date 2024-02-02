import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useGetOrdersQuery } from '../hooks/use-get-orders-query'
import { OrderFilters } from './order-filters'
import { OrderRow } from './order-row'
import { OrderRowSkeleton } from './order-row-skeleton'
import { OrdersPagination } from './orders-pagination'

export function OrdersTable() {
  const [searchParams] = useSearchParams()

  const filterParams = {
    orderId: z.string().nullable().parse(searchParams.get('orderId')),
    customerName: z.string().nullable().parse(searchParams.get('customerName')),
    status: z.string().nullable().parse(searchParams.get('status')),
    pageIndex: z.coerce
      .number()
      .transform((page) => page - 1)
      .parse(searchParams.get('page') ?? '1'),
  }

  const { data: result, isLoading: isLoadingOrders } = useGetOrdersQuery({
    pageIndex: filterParams.pageIndex,
    orderId: filterParams.orderId,
    customerName: filterParams.customerName,
    status: filterParams.status,
  })

  return (
    <div className="flex flex-col gap-4">
      <OrderFilters />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[64px]" />
              <TableHead className="w-[200px]">Identificador</TableHead>
              <TableHead className="w-[180px]">Realizado há</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[140px]">Total do pedido</TableHead>
              <TableHead className="w-[164px]" />
              <TableHead className="w-[132px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoadingOrders && <OrderRowSkeleton />}

            {result &&
              result.orders.map((order) => (
                <OrderRow key={order.orderId} order={order} />
              ))}
          </TableBody>
        </Table>
      </div>

      {result && (
        <OrdersPagination
          totalCount={result.meta.totalCount}
          pageIndex={result.meta.pageIndex}
          perPage={result.meta.perPage}
        />
      )}
    </div>
  )
}
