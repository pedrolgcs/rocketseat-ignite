import { api } from '@/lib/axios'

export type CancelOrderParams = {
  orderId: string
}

export async function cancelOrder(params: CancelOrderParams) {
  const { orderId } = params

  await api.patch(`/orders/${orderId}/cancel`)
}
