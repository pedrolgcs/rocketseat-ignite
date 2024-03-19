import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeDispatchOrderUseCase } from '@/infra/factories/use-cases'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { auth } from '../plugins'

const paramsSchema = z.object({
  id: z.string(),
})

export const dispatchOrderRouter = new Elysia()
  .use(auth)
  .post('/orders/:id/dispatch', async ({ set, params, getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const parseParams = paramsSchema.safeParse(params)

    if (!parseParams.success) {
      throw new ZodValidationError({ error: parseParams.error })
    }

    const { id } = parseParams.data

    const dispatchOrderUseCase = makeDispatchOrderUseCase()

    const dispatchOrderResult = await dispatchOrderUseCase.execute({
      orderId: id,
      managedRestaurantId: restaurantId,
    })

    if (dispatchOrderResult.isLeft()) {
      throw new UseCaseValidationError({
        message: dispatchOrderResult.value.message,
        friendlyMessage: dispatchOrderResult.value.friendlyMessage,
      })
    }

    set.status = 204
  })
