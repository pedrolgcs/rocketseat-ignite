import { useQuery } from '@tanstack/react-query'

import { getMonthCanceledOrdersAmount } from '../api/get-month-canceled-orders-amount'

export const USE_GET_MONTH_CANCELED_ORDERS_AMOUNT_QUERY_KEY =
  'month-canceled-orders-amount'

export type UseGetMonthCanceledOrdersAmountQueryKey = [
  'metrics',
  typeof USE_GET_MONTH_CANCELED_ORDERS_AMOUNT_QUERY_KEY,
]

export const useGetMonthCanceledOrdersAmountQuery = () => {
  return useQuery({
    queryKey: ['metrics', USE_GET_MONTH_CANCELED_ORDERS_AMOUNT_QUERY_KEY],
    queryFn: getMonthCanceledOrdersAmount,
    staleTime: Infinity,
  })
}
