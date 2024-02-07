import { http, HttpResponse } from 'msw'

import {
  GetDailyRevenueInPeriodParams,
  GetDailyRevenueInPeriodResponse,
} from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  GetDailyRevenueInPeriodParams,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', async () => {
  return HttpResponse.json([
    {
      date: '01/01',
      receipt: 100,
    },
    {
      date: '01/02',
      receipt: 130,
    },
    {
      date: '01/03',
      receipt: 80,
    },
    {
      date: '01/04',
      receipt: 150,
    },
    {
      date: '01/05',
      receipt: 250,
    },
    {
      date: '01/06',
      receipt: 200,
    },
  ])
})
