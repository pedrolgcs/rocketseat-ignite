import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deliverOrder, DeliverOrderParams } from '../api/deliver-order'
import { GetOrdersResponse } from '../api/get-orders'
import { USE_GET_ORDERS_QUERY_KEY } from './use-get-orders-query'

export const useDeliverOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeliverOrderParams) => deliverOrder(params),
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
                status: 'delivered',
              }
            }

            return order
          }),
        })
      })
    },
  })
}
