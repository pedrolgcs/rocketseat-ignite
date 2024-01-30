import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Order } from '@/types/order'
import { formatCurrency } from '@/utils/formatCurrency'

import { useCancelOrderMutation } from '../hooks/useCancelOrderMutation'
import { OrderDetail } from './order-details'
import { OrderStatus } from './order-status'

type OrderRowProps = {
  order: Order
}

export function OrderRow({ order }: OrderRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const canNotCancelOrder = ['canceled', 'delivered', 'delivering'].includes(
    order.status,
  )

  const { mutateAsync: cancelOrder } = useCancelOrderMutation()

  const handleCancelOrder = async () => {
    await cancelOrder({ orderId: order.orderId })
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetail orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {formatCurrency(order.total / 100)}
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={canNotCancelOrder}
          onClick={handleCancelOrder}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
