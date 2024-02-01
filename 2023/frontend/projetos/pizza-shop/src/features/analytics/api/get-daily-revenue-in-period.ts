import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriodParams = {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod(
  params: GetDailyRevenueInPeriodParams,
) {
  const { from, to } = params
  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
