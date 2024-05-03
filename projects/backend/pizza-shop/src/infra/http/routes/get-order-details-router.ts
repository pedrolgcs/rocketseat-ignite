import { Elysia } from 'elysia'
import { z } from 'zod'

import { makeGetOrderDetailsByIdUseCase } from '@/infra/factories/use-cases'
import {
  OrderItemPresenter,
  OrderPresenter,
  UserPresenter,
} from '@/infra/http/presenters'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { auth } from '../plugins'

const paramsSchema = z.object({
  id: z.string(),
})

export const getOrderDetailsRouter = new Elysia()
  .use(auth)
  .get('/orders/:id', async ({ getCurrentUser, params }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError({})
    }

    const parseParams = paramsSchema.safeParse(params)

    if (!parseParams.success) {
      throw new ZodValidationError({ error: parseParams.error })
    }

    const { id } = parseParams.data

    const getOrderDetails = makeGetOrderDetailsByIdUseCase()

    const getOrderDetailsResult = await getOrderDetails.execute({ orderId: id })

    if (getOrderDetailsResult.isLeft()) {
      throw new UseCaseValidationError({
        message: getOrderDetailsResult.value.message,
        friendlyMessage: getOrderDetailsResult.value.friendlyMessage,
      })
    }

    const { order, customer, orderItems } = getOrderDetailsResult.value

    const orderToResponse = OrderPresenter.toHTTP(order)
    const customerToResponse = customer
      ? UserPresenter.toHTTP(customer)
      : undefined
    const orderItemsToResponse = orderItems.map(OrderItemPresenter.toHTTP)

    const payload = {
      order: orderToResponse,
      customer: customerToResponse
        ? {
            name: customerToResponse.name,
            email: customerToResponse.email,
            phone: customerToResponse.phone,
          }
        : undefined,
      items: orderItemsToResponse.map((item) => ({
        id: item.id,
        princeInCents: item.priceInCents,
        quantity: item.quantity,
        product: item.product
          ? {
              name: item.product.name,
            }
          : undefined,
      })),
    }

    return payload
  })
