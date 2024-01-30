import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cancelOrder, CancelOrderParams } from '../api/cancel-order'
import { GetOrdersResponse } from '../api/get-orders'
import { USE_GET_ORDERS_QUERY_KEY } from './useGetOrdersQuery'

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CancelOrderParams) => cancelOrder(params),
    onSuccess(_, variables) {
      const { orderId } = variables
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: [USE_GET_ORDERS_QUERY_KEY],
      })

      ordersListCache.forEach((cached) => {
        const [key, data] = cached
        if (!data) return null

        queryClient.setQueryData<GetOrdersResponse>(key, {
          ...data,
          orders: data.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: 'canceled',
              }
            }

            return order
          }),
        })
      })
    },
  })
}
