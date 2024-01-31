import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Order } from '@/types/order'
import { formatCurrency } from '@/utils/formatCurrency'

import { useApproveOrderMutation } from '../hooks/use-approve-order-mutation'
import { useCancelOrderMutation } from '../hooks/use-cancel-order-mutation'
import { useDeliverOrderMutation } from '../hooks/use-deliver-order-mutation'
import { useDispatchOrderMutation } from '../hooks/use-dispatch-order-mutation'
import { OrderDetail } from './order-details'
import { OrderStatus } from './order-status'

type OrderRowProps = {
  order: Order
}

export function OrderRow({ order }: OrderRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useCancelOrderMutation()
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useDeliverOrderMutation()
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useApproveOrderMutation()
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useDispatchOrderMutation()

  const canNotCancelOrder =
    ['canceled', 'delivered', 'delivering'].includes(order.status) ||
    isCancelingOrder

  const handleCancelOrder = async () => {
    await cancelOrderFn({ orderId: order.orderId })
  }

  const handleDeliverOrder = async () => {
    await deliverOrderFn({ orderId: order.orderId })
  }

  const handleApproveOrder = async () => {
    await approveOrderFn({ orderId: order.orderId })
  }

  const handleDispatchOrder = async () => {
    await dispatchOrderFn({ orderId: order.orderId })
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
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            onClick={handleApproveOrder}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            onClick={handleDispatchOrder}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            onClick={handleDeliverOrder}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}

        {order.status === 'delivered' && (
          <Button variant="outline" size="xs" disabled>
            <ArrowRight className="mr-2 h-3 w-3" />
            Finalizado
          </Button>
        )}
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
