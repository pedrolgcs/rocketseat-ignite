import dayjs from 'dayjs'
import { Elysia } from 'elysia'

import { makeGetRestaurantRevenueByMonthUseCase } from '@/infra/factories/use-cases'

import { UnauthorizedError, UnexpectedError } from '../errors'
import { auth } from '../plugins'

export const getMonthRevenue = new Elysia()
  .use(auth)
  .get('/orders/metrics/moth-revenue', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({
        friendlyMessage: 'Usuário não é gerente.',
      })
    }

    const today = dayjs()
    const lastMonth = today.subtract(1, 'month')
    const startOfLastMonth = lastMonth.startOf('month')

    const getRestaurantRevenueByMonth = makeGetRestaurantRevenueByMonthUseCase()

    const getRestaurantRevenueByMonthResult =
      await getRestaurantRevenueByMonth.execute({
        restaurantId,
        currentMonth: today.toDate(),
        startOfLastMonth: startOfLastMonth.toDate(),
      })

    if (getRestaurantRevenueByMonthResult.isLeft()) {
      throw new UnexpectedError({})
    }

    const { revenue, diffFromLastMonth } =
      getRestaurantRevenueByMonthResult.value

    return { revenue, diffFromLastMonth }
  })
