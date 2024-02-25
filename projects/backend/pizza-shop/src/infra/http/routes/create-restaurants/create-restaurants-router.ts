import Elysia, { t } from 'elysia'

import {
  makeCreateManagerUseCase,
  makeCreateRestaurantUseCase,
} from '@/infra/factories/use-cases'

export const createRestaurantsRouter = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, managerName, email, phone } = body

    const createManager = makeCreateManagerUseCase()
    const createRestaurant = makeCreateRestaurantUseCase()

    const createManagerResult = await createManager.execute({
      name: managerName,
      email,
      phone,
    })

    // TODO: Handle error
    if (createManagerResult.isLeft()) {
      return (set.status = 400)
    }

    const { manager } = createManagerResult.value

    const createRestaurantResult = await createRestaurant.execute({
      name: restaurantName,
      managerId: manager.id.toString(),
    })

    // TODO: Handle error
    if (createRestaurantResult.isLeft()) {
      return (set.status = 400)
    }

    set.status = 204
  },
  {
    body: t.Object({
      restaurantName: t.String(),
      managerName: t.String(),
      email: t.String({ format: 'email' }),
      phone: t.Optional(t.String()),
    }),
  },
)
