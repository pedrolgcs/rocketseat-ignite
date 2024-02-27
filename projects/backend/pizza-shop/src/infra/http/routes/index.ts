import { Elysia, InternalServerError, NotFoundError } from 'elysia'

import { UseCaseValidationError, ZodValidationError } from '../errors'
import { createRestaurantsRouter } from './create-restaurants/create-restaurants-router'
import { healthCheckRouter } from './health-check/health-check-router'

export const routes = new Elysia()
  .error({
    ZOD_VALIDATION: ZodValidationError,
    USE_CASE_VALIDATION: UseCaseValidationError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'ZOD_VALIDATION': {
        set.status = 400
        return error.toHTTP()
      }
      case 'USE_CASE_VALIDATION': {
        set.status = 400
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
  .use(createRestaurantsRouter)
