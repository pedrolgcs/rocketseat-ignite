import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeApproveOrderUseCase } from '@/infra/factories/use-cases'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { auth } from '../plugins'

const paramsSchema = z.object({
  id: z.string(),
})

export const approveOrderRouter = new Elysia()
  .use(auth)
  .post('/orders/:id/approve', async ({ set, params, getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const parseParams = paramsSchema.safeParse(params)

    if (!parseParams.success) {
      throw new ZodValidationError({ error: parseParams.error })
    }

    const { id } = parseParams.data

    const approveOrderUseCase = makeApproveOrderUseCase()

    const approveOrderResult = await approveOrderUseCase.execute({
      orderId: id,
      managedRestaurantId: restaurantId,
    })

    if (approveOrderResult.isLeft()) {
      throw new UseCaseValidationError({
        message: approveOrderResult.value.message,
        friendlyMessage: approveOrderResult.value.friendlyMessage,
      })
    }

    set.status = 204
  })
