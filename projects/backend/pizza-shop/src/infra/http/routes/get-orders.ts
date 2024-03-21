import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeFetchOrdersByRestaurantIdUseCase } from '@/infra/factories/use-cases'
import { auth } from '@/infra/http/plugins'
import { OrderPresenter } from '@/infra/http/presenters'

import {
  UnauthorizedError,
  UnexpectedError,
  ZodValidationError,
} from '../errors'

const querySchema = z.object({
  customerName: z.string().optional(),
  orderId: z.string().optional(),
  status: z
    .enum(['pending', 'processing', 'delivering', 'delivered', 'canceled'])
    .optional(),
  pageIndex: z.coerce.number().min(0).optional().default(0),
  perPage: z.coerce.number().min(1).optional().default(10),
})

export const getOrdersRouter = new Elysia()
  .use(auth)
  .get('/orders', async ({ getCurrentUser, query }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const queryParams = querySchema.safeParse(query)

    if (!queryParams.success) {
      throw new ZodValidationError({ error: queryParams.error })
    }

    const { customerName, orderId, status, pageIndex, perPage } =
      queryParams.data

    const fetchOrdersByRestaurantIdUseCase =
      makeFetchOrdersByRestaurantIdUseCase()

    const fetchOrdersByRestaurantIdResult =
      await fetchOrdersByRestaurantIdUseCase.execute({
        restaurantId,
        pageIndex,
        perPage,
        customerName,
        orderId,
        status,
      })

    if (fetchOrdersByRestaurantIdResult.isLeft()) {
      throw new UnexpectedError({})
    }

    const payload = {
      orders: fetchOrdersByRestaurantIdResult.value.items.map(
        OrderPresenter.toHTTP,
      ),
      meta: fetchOrdersByRestaurantIdResult.value.meta,
    }

    return payload
  })
