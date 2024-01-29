import { api } from '@/lib/axios'
import { OrderDetails } from '@/types/order'

export type GetOrderDetailsParams = {
  orderId: string
}

export async function getOrderDetails(params: GetOrderDetailsParams) {
  const { orderId } = params
  const response = await api.get<OrderDetails>(`/orders/${orderId}`)
  return response.data
}
