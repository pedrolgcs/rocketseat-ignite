import { Elysia } from 'elysia'

import { makeGetMonthOrdersAmountUseCase } from '@/infra/factories/use-cases'
import { UnexpectedError } from '@/infra/http/errors'

import { UnauthorizedError } from '../errors'
import { auth } from '../plugins'

export const getMonthOrdersAmount = new Elysia()
  .use(auth)
  .get('/orders/metrics/month-orders-amount', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({
        friendlyMessage: 'Usuário não é gerente.',
      })
    }

    const getMonthOrdersAmountUseCase = makeGetMonthOrdersAmountUseCase()

    const today = new Date()

    const getMonthOrdersAmountResult =
      await getMonthOrdersAmountUseCase.execute({
        restaurantId,
        date: today,
      })

    if (getMonthOrdersAmountResult.isLeft()) {
      throw new UnexpectedError({})
    }

    const { amount, diffFromLastMonth } = getMonthOrdersAmountResult.value

    return {
      amount,
      diffFromLastMonth,
    }
  })
