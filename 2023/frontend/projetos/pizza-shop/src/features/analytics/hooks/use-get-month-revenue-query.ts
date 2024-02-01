import { useQuery } from '@tanstack/react-query'

import { getMonthRevenue } from '../api/get-month-revenue'

export const USE_GET_MONTH_REVENUE_QUERY_KEY = 'month-revenue-amount'

export type UseGetMonthOrdersAmountQueryKey = [
  'metrics',
  typeof USE_GET_MONTH_REVENUE_QUERY_KEY,
]

export const useGetMonthRevenueQuery = () => {
  return useQuery({
    queryKey: ['metrics', USE_GET_MONTH_REVENUE_QUERY_KEY],
    queryFn: getMonthRevenue,
    staleTime: Infinity,
  })
}
