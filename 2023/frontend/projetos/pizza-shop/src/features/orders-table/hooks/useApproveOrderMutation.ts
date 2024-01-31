import { useMutation, useQueryClient } from '@tanstack/react-query'

import { approveOrder, ApproveOrderParams } from '../api/approve-order'
import { GetOrdersResponse } from '../api/get-orders'
import { USE_GET_ORDERS_QUERY_KEY } from './useGetOrdersQuery'

export const useApproveOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: ApproveOrderParams) => approveOrder(params),
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
                status: 'processing',
              }
            }

            return order
          }),
        })
      })
    },
  })
}
