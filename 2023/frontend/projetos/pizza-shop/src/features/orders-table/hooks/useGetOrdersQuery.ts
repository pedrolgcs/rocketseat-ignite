import { useQuery } from '@tanstack/react-query'

import { getOrders } from '../api/get-orders'

export const USE_GET_ORDERS_QUERY_KEY = 'orders'

export const useGetOrdersQuery = () => {
  return useQuery({
    queryKey: [USE_GET_ORDERS_QUERY_KEY],
    queryFn: getOrders,
    staleTime: Infinity,
  })
}
