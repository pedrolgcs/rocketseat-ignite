import { Elysia } from 'elysia'

import { makeGetDayOrdersAmountUseCase } from '@/infra/factories/use-cases'
import { UnexpectedError } from '@/infra/http/errors'

import { UnauthorizedError } from '../errors'
import { auth } from '../plugins'

export const getTodayOrdersAmount = new Elysia()
  .use(auth)
  .get('/orders/metrics/today-orders-amount', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({
        friendlyMessage: 'Usuário não é gerente.',
      })
    }

    const getDayOrdersAmountUseCase = makeGetDayOrdersAmountUseCase()

    const today = new Date()

    const getDayOrdersAmountResult = await getDayOrdersAmountUseCase.execute({
      restaurantId,
      date: today,
    })

    if (getDayOrdersAmountResult.isLeft()) {
      throw new UnexpectedError({})
    }

    const { amount, diffFromLastDay } = getDayOrdersAmountResult.value

    return {
      amount,
      diffFromLastDay,
    }
  })
