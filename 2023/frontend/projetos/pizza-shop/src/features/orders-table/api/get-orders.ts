import { api } from '@/lib/axios'
import { Order } from '@/types/order'

export type GetOrdersParams = {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export type GetOrdersResponse = {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders(params: GetOrdersParams) {
  const { pageIndex, orderId, customerName, status } = params
  const transformedStatus = status === 'all' ? null : status

  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status: transformedStatus,
    },
  })

  return response.data
}
