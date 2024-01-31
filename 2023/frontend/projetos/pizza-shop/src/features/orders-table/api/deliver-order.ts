import { api } from '@/lib/axios'

export type DeliverOrderParams = {
  orderId: string
}

export async function deliverOrder(params: DeliverOrderParams) {
  const { orderId } = params

  await api.patch(`/orders/${orderId}/deliver`)
}
