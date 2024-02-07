import { getDailyRevenueInPeriodMock } from './api/mocks/get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMock } from './api/mocks/get-day-orders-amount-mock'
import { getMonthCanceledOrdersAmountMock } from './api/mocks/get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './api/mocks/get-month-orders-amount-mock'
import { getMonthRevenueMock } from './api/mocks/get-month-revenue-mock'
import { getPopularProductsMock } from './api/mocks/get-popular-products-mock'

export { Dashboard } from './components/dashboard'

export const analyticHttpMocks = [
  getDailyRevenueInPeriodMock,
  getDayOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
]
