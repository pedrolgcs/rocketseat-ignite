import { useQuery } from '@tanstack/react-query'

import { getDayOrdersAmount } from '../api/get-day-orders-amount'

export const USE_GET_DAY_ORDERS_AMOUNT_QUERY_KEY = 'day-orders-amount'

export type UseGetDayOrdersAmountQueryKey = [
  'metrics',
  typeof USE_GET_DAY_ORDERS_AMOUNT_QUERY_KEY,
]

export const useGetDayOrdersAmountQuery = () => {
  return useQuery({
    queryKey: ['metrics', USE_GET_DAY_ORDERS_AMOUNT_QUERY_KEY],
    queryFn: getDayOrdersAmount,
    staleTime: Infinity,
  })
}
