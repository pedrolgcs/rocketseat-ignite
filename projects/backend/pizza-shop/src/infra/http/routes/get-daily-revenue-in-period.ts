import dayjs from 'dayjs'
import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeGetDailyRevenueInPeriodUseCase } from '@/infra/factories/use-cases'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { auth } from '../plugins'

const querySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
})

export const getDailyRevenueInPeriod = new Elysia()
  .use(auth)
  .get(
    '/orders/metrics/daily-revenue-in-period',
    async ({ getCurrentUser, query }) => {
      const { restaurantId } = await getCurrentUser()

      if (!restaurantId) {
        throw new UnauthorizedError({
          friendlyMessage: 'Usuário não é gerente.',
        })
      }

      const parseQuery = querySchema.safeParse(query)

      if (!parseQuery.success) {
        throw new ZodValidationError({ error: parseQuery.error })
      }

      const { to, from } = parseQuery.data

      const today = dayjs()

      const startDate = from ? dayjs(from) : today.subtract(7, 'days')
      const endDate = to ? dayjs(to) : from ? startDate.add(7, 'days') : today

      const getDailyRevenueInPeriodUseCase =
        makeGetDailyRevenueInPeriodUseCase()

      const getDailyRevenueInPeriodResult =
        await getDailyRevenueInPeriodUseCase.execute({
          restaurantId,
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
        })

      if (getDailyRevenueInPeriodResult.isLeft()) {
        throw new UseCaseValidationError({
          message: getDailyRevenueInPeriodResult.value.message,
          friendlyMessage: getDailyRevenueInPeriodResult.value.friendlyMessage,
        })
      }

      const { orders } = getDailyRevenueInPeriodResult.value

      if (Object.keys(orders).length === 0) {
        return {
          orders: null,
        }
      }

      const payload = {
        orders,
      }

      return payload
    },
  )
