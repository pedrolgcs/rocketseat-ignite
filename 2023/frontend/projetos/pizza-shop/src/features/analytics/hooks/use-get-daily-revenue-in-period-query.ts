import { useQuery } from '@tanstack/react-query'

import {
  getDailyRevenueInPeriod,
  GetDailyRevenueInPeriodParams,
} from '../api/get-daily-revenue-in-period'

export const USE_GET_DAILY_REVENUE_IN_PERIOD_QUERY_KEY =
  'daily-revenue-in-period'

export type UseGetDailyRevenueInPeriodQueryKey = [
  'metrics',
  typeof USE_GET_DAILY_REVENUE_IN_PERIOD_QUERY_KEY,
]

export const useGetDailyRevenueInPeriodQuery = (
  params: GetDailyRevenueInPeriodParams,
) => {
  return useQuery({
    queryKey: ['metrics', USE_GET_DAILY_REVENUE_IN_PERIOD_QUERY_KEY, params],
    queryFn: () => getDailyRevenueInPeriod(params),
    staleTime: Infinity,
  })
}
