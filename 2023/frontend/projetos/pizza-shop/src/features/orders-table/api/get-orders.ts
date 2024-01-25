import { api } from '@/lib/axios'
import { Order } from '@/types/order'

export type GetOrdersParams = {
  pageIndex?: number | null
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
  const { pageIndex = 0 } = params

  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
