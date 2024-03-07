import Elysia from 'elysia'
import { z } from 'zod'

import {
  makeCreateManagerUseCase,
  makeCreateRestaurantUseCase,
} from '@/infra/factories/use-cases'
import { UseCaseValidationError, ZodValidationError } from '@/infra/http/errors'

const bodySchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
})

export const registerRestaurantsRouter = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const parseBody = bodySchema.safeParse(body)

    if (!parseBody.success) {
      throw new ZodValidationError({ error: parseBody.error })
    }

    const { managerName, restaurantName, email, phone } = parseBody.data

    const createManager = makeCreateManagerUseCase()
    const createRestaurant = makeCreateRestaurantUseCase()

    const createManagerResult = await createManager.execute({
      name: managerName,
      email,
      phone,
    })

    if (createManagerResult.isLeft()) {
      throw new UseCaseValidationError({
        message: createManagerResult.value.message,
        friendlyMessage: createManagerResult.value.friendlyMessage,
      })
    }

    const { manager } = createManagerResult.value

    const createRestaurantResult = await createRestaurant.execute({
      name: restaurantName,
      managerId: manager.id.toString(),
    })

    if (createRestaurantResult.isLeft()) {
      throw new UseCaseValidationError({
        message: createRestaurantResult.value.message,
        friendlyMessage: createRestaurantResult.value.friendlyMessage,
      })
    }

    set.status = 204
  },
)
