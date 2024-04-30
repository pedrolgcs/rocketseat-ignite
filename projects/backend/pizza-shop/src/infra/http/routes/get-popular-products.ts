import { Elysia } from 'elysia'

import { makeGetPopularProductsByRestaurantUseCase } from '@/infra/factories/use-cases'
import { UnauthorizedError, UnexpectedError } from '@/infra/http/errors'
import { auth } from '@/infra/http/plugins'

export const getPopularProducts = new Elysia()
  .use(auth)
  .get('/orders/metrics/popular-products', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const getPopularProductsByRestaurantUseCase =
      makeGetPopularProductsByRestaurantUseCase()

    const popularProductsResult =
      await getPopularProductsByRestaurantUseCase.execute({
        restaurantId,
      })

    if (popularProductsResult.isLeft()) {
      throw new UnexpectedError({})
    }

    const { products } = popularProductsResult.value

    const productsToHttp = products.map(({ product, amount }) => {
      return {
        name: product.name,
        description: product.description,
        amount,
      }
    })

    const payload = {
      products: productsToHttp,
    }

    return payload
  })
