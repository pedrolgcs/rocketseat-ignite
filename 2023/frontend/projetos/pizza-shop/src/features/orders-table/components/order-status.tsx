import { cn } from '@/lib/utils'
import { Status } from '@/types/order'

type OrderStatusProps = {
  status: Status
}

const ordersStatusMap: Record<
  Status,
  {
    label: string
    color: string
  }
> = {
  pending: {
    label: 'Pendente',
    color: 'bg-slate-400',
  },
  canceled: {
    label: 'Cancelado',
    color: 'bg-red-500',
  },
  delivered: {
    label: 'Entregue',
    color: 'bg-emerald-500',
  },
  delivering: {
    label: 'Em entrega',
    color: 'bg-yellow-500',
  },
  processing: {
    label: 'Em preparo',
    color: 'bg-blue-500',
  },
}

export function OrderStatus({ status }: OrderStatusProps) {
  const statusMap = ordersStatusMap[status]

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('h-2 w-2 rounded-full', statusMap.color)}
        data-testid="badge"
      />
      <span className="font-medium text-muted-foreground">
        {statusMap.label}
      </span>
    </div>
  )
}
