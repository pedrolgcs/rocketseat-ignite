import { Elysia } from 'elysia'

import { makeGetRestaurantByIdUseCase } from '@/infra/factories/use-cases'
import { RestaurantPresenter } from '@/infra/http/presenters'

import { UnauthorizedError, UseCaseValidationError } from '../errors'
import { auth } from '../plugins'

export const getManagedRestaurantRouter = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({
        friendlyMessage: 'Usuário não é gerente.',
      })
    }

    const getRestaurantById = makeGetRestaurantByIdUseCase()

    const getRestaurantByIdResult = await getRestaurantById.execute({
      restaurantId,
    })

    if (getRestaurantByIdResult.isLeft()) {
      throw new UseCaseValidationError({
        message: getRestaurantByIdResult.value.message,
        friendlyMessage: getRestaurantByIdResult.value.friendlyMessage,
      })
    }

    const { restaurant } = getRestaurantByIdResult.value

    return RestaurantPresenter.toHTTP(restaurant)
  })
