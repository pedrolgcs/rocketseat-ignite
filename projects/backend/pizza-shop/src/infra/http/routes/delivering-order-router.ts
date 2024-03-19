import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeDeliveringOrderUseCase } from '@/infra/factories/use-cases'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { auth } from '../plugins'

const paramsSchema = z.object({
  id: z.string(),
})

export const deliveringOrderRouter = new Elysia()
  .use(auth)
  .post('/orders/:id/delivering', async ({ set, params, getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const parseParams = paramsSchema.safeParse(params)

    if (!parseParams.success) {
      throw new ZodValidationError({ error: parseParams.error })
    }

    const { id } = parseParams.data

    const deliveringOrderUseCase = makeDeliveringOrderUseCase()

    const deliveringOrderResult = await deliveringOrderUseCase.execute({
      orderId: id,
      managedRestaurantId: restaurantId,
    })

    if (deliveringOrderResult.isLeft()) {
      throw new UseCaseValidationError({
        message: deliveringOrderResult.value.message,
        friendlyMessage: deliveringOrderResult.value.friendlyMessage,
      })
    }

    set.status = 204
  })
