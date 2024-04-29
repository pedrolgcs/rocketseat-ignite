import { Elysia, InternalServerError, NotFoundError } from 'elysia'

import {
  UnauthorizedError,
  UnexpectedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { approveOrderRouter } from './approve-order-router'
import { authenticateFromLinkRouter } from './authenticate-from-link-router'
import { cancelOrderRouter } from './cancel-order-router'
import { deliverOrderRouter } from './deliver-order-router'
import { dispatchOrderRouter } from './dispatch-order-router'
import { getManagedRestaurantRouter } from './get-managed-restaurant.router'
import { getMonthRevenue } from './get-month-revenue'
import { getOrderDetailsRouter } from './get-order-details'
import { getOrdersRouter } from './get-orders'
import { getProfileRouter } from './get-profile-router'
import { getTodayOrdersAmount } from './get-today-orders-amount'
import { healthCheckRouter } from './health-check-router'
import { registerRestaurantsRouter } from './register-restaurants-router'
import { sendAuthLinkRouter } from './send-auth-link-router'
import { signOutRouter } from './sign-out-router'

export const routes = new Elysia()
  .error({
    ZOD_VALIDATION: ZodValidationError,
    USE_CASE_VALIDATION: UseCaseValidationError,
    UNAUTHORIZED: UnauthorizedError,
    UNEXPECTED: UnexpectedError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'ZOD_VALIDATION': {
        set.status = 400
        return error.toHTTP()
      }
      case 'USE_CASE_VALIDATION': {
        set.status = 422
        return error.toHttp()
      }
      case 'UNAUTHORIZED': {
        set.status = 401
        return error.toHttp()
      }
      case 'UNEXPECTED': {
        set.status = 500
        return error.toHttp()
      }
      case 'NOT_FOUND': {
        return new NotFoundError()
      }
      case 'INTERNAL_SERVER_ERROR': {
        return new InternalServerError(error.message)
      }
      default: {
        return new Response(error.stack, { status: 500 })
      }
    }
  })
  .use(healthCheckRouter)
  .use(registerRestaurantsRouter)
  .use(sendAuthLinkRouter)
  .use(authenticateFromLinkRouter)
  .use(signOutRouter)
  .use(getProfileRouter)
  .use(getManagedRestaurantRouter)
  .use(getOrderDetailsRouter)
  .use(approveOrderRouter)
  .use(cancelOrderRouter)
  .use(deliverOrderRouter)
  .use(dispatchOrderRouter)
  .use(getOrdersRouter)
  .use(getMonthRevenue)
  .use(getTodayOrdersAmount)
