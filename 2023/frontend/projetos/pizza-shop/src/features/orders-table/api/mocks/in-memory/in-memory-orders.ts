import { Order, Status } from '@/types/order'

const statuses: Status[] = [
  'canceled',
  'delivered',
  'delivering',
  'pending',
  'processing',
]

export const inMemoryOrders: Order[] = Array.from({ length: 100 }).map(
  (_, i) => {
    return {
      orderId: `order-${i + 1}`,
      customerName: `Customer ${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total: 2400,
      createdAt: new Date().toISOString(),
    }
  },
)
