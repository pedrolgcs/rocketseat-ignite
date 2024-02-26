import Elysia, { InternalServerError, NotFoundError } from 'elysia'
import { z } from 'zod'

import {
  makeCreateManagerUseCase,
  makeCreateRestaurantUseCase,
} from '@/infra/factories/use-cases'
import { ZodValidationError } from '@/infra/http/errors'

const BodySchema = z.object({
  restaurantName: z.string(),
  managerName: z.string().email(),
  email: z.string(),
  phone: z.string().optional(),
})

export const createRestaurantsRouter = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const parseBody = BodySchema.safeParse(body)

    if (!parseBody.success) {
      throw new ZodValidationError('Validation error', parseBody.error)
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
      return new InternalServerError()
    }

    const { manager } = createManagerResult.value

    const createRestaurantResult = await createRestaurant.execute({
      name: restaurantName,
      managerId: manager.id.toString(),
    })

    if (createRestaurantResult.isLeft()) {
      return new NotFoundError('Manager not found')
    }

    set.status = 204
  },
)
