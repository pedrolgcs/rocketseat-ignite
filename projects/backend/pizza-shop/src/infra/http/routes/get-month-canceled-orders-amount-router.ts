import { Elysia } from 'elysia'

import { makeGetMonthCanceledOrdersAmountUseCase } from '@/infra/factories/use-cases'
import { UnexpectedError } from '@/infra/http/errors'

import { UnauthorizedError } from '../errors'
import { auth } from '../plugins'

export const getMonthCanceledOrdersAmount = new Elysia()
  .use(auth)
  .get(
    '/orders/metrics/month-canceled-orders-amount',
    async ({ getCurrentUser }) => {
      const { restaurantId } = await getCurrentUser()

      if (!restaurantId) {
        throw new UnauthorizedError({
          friendlyMessage: 'Usuário não é gerente.',
        })
      }

      const getMonthCanceledOrdersAmountUseCase =
        makeGetMonthCanceledOrdersAmountUseCase()

      const today = new Date()

      const getMonthCanceledOrdersAmountResult =
        await getMonthCanceledOrdersAmountUseCase.execute({
          restaurantId,
          date: today,
        })

      if (getMonthCanceledOrdersAmountResult.isLeft()) {
        throw new UnexpectedError({})
      }

      const { amount, diffFromLastMonth } =
        getMonthCanceledOrdersAmountResult.value

      return {
        amount,
        diffFromLastMonth,
      }
    },
  )
