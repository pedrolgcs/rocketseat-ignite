import { api } from '@/lib/axios'

export type DispatchOrderParams = {
  orderId: string
}

export async function dispatchOrder(params: DispatchOrderParams) {
  const { orderId } = params

  await api.patch(`/orders/${orderId}/dispatch`)
}
