import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeDeliverOrderUseCase } from '@/infra/factories/use-cases'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { auth } from '../plugins'

const paramsSchema = z.object({
  id: z.string(),
})

export const deliverOrderRouter = new Elysia()
  .use(auth)
  .post('/orders/:id/deliver', async ({ set, params, getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const parseParams = paramsSchema.safeParse(params)

    if (!parseParams.success) {
      throw new ZodValidationError({ error: parseParams.error })
    }

    const { id } = parseParams.data

    const deliverOrderUseCase = makeDeliverOrderUseCase()

    const deliverOrderResult = await deliverOrderUseCase.execute({
      orderId: id,
      managedRestaurantId: restaurantId,
    })

    if (deliverOrderResult.isLeft()) {
      throw new UseCaseValidationError({
        message: deliverOrderResult.value.message,
        friendlyMessage: deliverOrderResult.value.friendlyMessage,
      })
    }

    set.status = 204
  })
