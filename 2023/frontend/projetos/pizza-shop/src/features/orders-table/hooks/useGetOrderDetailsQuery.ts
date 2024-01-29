import { useQuery } from '@tanstack/react-query'

import {
  getOrderDetails,
  GetOrderDetailsParams,
} from '../api/get-order-details'

export const USE_GET_ORDER_DETAILS_QUERY_KEY = 'order-details'

export type UseGetOrderDetailsQueryKey = [
  typeof USE_GET_ORDER_DETAILS_QUERY_KEY,
  GetOrderDetailsParams,
]

type Options = {
  enabled: boolean
}

export const useGetOrderDetailsQuery = (
  params: GetOrderDetailsParams,
  options: Options,
) => {
  return useQuery({
    queryKey: [USE_GET_ORDER_DETAILS_QUERY_KEY, params],
    queryFn: () => getOrderDetails(params),
    staleTime: Infinity,
    enabled: options.enabled,
  })
}
