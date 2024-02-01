import { useQuery } from '@tanstack/react-query'

import { getMonthOrdersAmount } from '../api/get-month-orders-amount'

export const USE_GET_MONTH_ORDERS_AMOUNT_QUERY_KEY = 'month-orders-amount'

export type UseGetMonthOrdersAmountQueryKey = [
  'metrics',
  typeof USE_GET_MONTH_ORDERS_AMOUNT_QUERY_KEY,
]

export const useGetMonthOrdersAmountQuery = () => {
  return useQuery({
    queryKey: ['metrics', USE_GET_MONTH_ORDERS_AMOUNT_QUERY_KEY],
    queryFn: getMonthOrdersAmount,
    staleTime: Infinity,
  })
}
