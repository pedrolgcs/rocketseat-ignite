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
import { getDailyRevenueInPeriod } from './get-daily-revenue-in-period'
import { getManagedRestaurantRouter } from './get-managed-restaurant.router'
import { getMonthCanceledOrdersAmount } from './get-month-canceled-orders-amount-router'
import { getMonthOrdersAmount } from './get-month-orders-amount-router'
import { getMonthRevenue } from './get-month-revenue-router'
import { getOrderDetailsRouter } from './get-order-details-router'
import { getOrdersRouter } from './get-orders-router'
import { getPopularProducts } from './get-popular-products-router'
import { getProfileRouter } from './get-profile-router'
import { getTodayOrdersAmount } from './get-today-orders-amount-router'
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
  .use(getMonthOrdersAmount)
  .use(getMonthCanceledOrdersAmount)
  .use(getPopularProducts)
  .use(getDailyRevenueInPeriod)
