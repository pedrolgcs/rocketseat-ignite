import { useQuery } from '@tanstack/react-query'

import { getOrders, GetOrdersParams } from '../api/get-orders'

export const USE_GET_ORDERS_QUERY_KEY = 'orders'

export type UseGetOrdersQueryKey = [
  typeof USE_GET_ORDERS_QUERY_KEY,
  GetOrdersParams,
]

export const useGetOrdersQuery = (params: GetOrdersParams) => {
  return useQuery({
    queryKey: [USE_GET_ORDERS_QUERY_KEY, params],
    queryFn: () => getOrders(params),
    staleTime: Infinity,
  })
}
