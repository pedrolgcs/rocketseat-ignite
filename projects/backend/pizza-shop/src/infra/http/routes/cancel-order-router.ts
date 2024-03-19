import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeCancelOrderUseCase } from '@/infra/factories/use-cases'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { auth } from '../plugins'

const paramsSchema = z.object({
  id: z.string(),
})

export const cancelOrderRouter = new Elysia()
  .use(auth)
  .post('/orders/:id/cancel', async ({ set, params, getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const parseParams = paramsSchema.safeParse(params)

    if (!parseParams.success) {
      throw new ZodValidationError({ error: parseParams.error })
    }

    const { id } = parseParams.data

    const cancelOrderUseCase = makeCancelOrderUseCase()

    const cancelOrderResult = await cancelOrderUseCase.execute({
      orderId: id,
      managedRestaurantId: restaurantId,
    })

    if (cancelOrderResult.isLeft()) {
      throw new UseCaseValidationError({
        message: cancelOrderResult.value.message,
        friendlyMessage: cancelOrderResult.value.friendlyMessage,
      })
    }

    set.status = 204
  })
