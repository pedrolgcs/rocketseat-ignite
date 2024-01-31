import { api } from '@/lib/axios'

export type ApproveOrderParams = {
  orderId: string
}

export async function approveOrder(params: ApproveOrderParams) {
  const { orderId } = params

  await api.patch(`/orders/${orderId}/approve`)
}
