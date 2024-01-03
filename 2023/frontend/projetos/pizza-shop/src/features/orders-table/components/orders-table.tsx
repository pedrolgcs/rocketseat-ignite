import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderFilters } from './order-filters'
import { OrderRow } from './order-row'

export function OrdersTable() {
  return (
    <div className="space-y-2.5">
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
            {Array.from({ length: 10 }).map((_, index) => (
              <OrderRow key={index} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
