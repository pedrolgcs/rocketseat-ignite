import { Elysia, InternalServerError, NotFoundError } from 'elysia'

import {
  UnauthorizedError,
  UseCaseValidationError,
  ZodValidationError,
} from '../errors'
import { authenticateFromLinkRouter } from './authenticate-from-link/authenticate-from-link-router'
import { getProfile } from './get-profile/get-profile-router'
import { healthCheckRouter } from './health-check/health-check-router'
import { registerRestaurantsRouter } from './register-restaurants/register-restaurants-router'
import { sendAuthLinkRouter } from './send-auth-link/send-auth-link-router'
import { signOutRouter } from './sign-out/sign-out-router'

export const routes = new Elysia()
  .error({
    ZOD_VALIDATION: ZodValidationError,
    USE_CASE_VALIDATION: UseCaseValidationError,
    UNAUTHORIZED: UnauthorizedError,
  })
  .onError(({ error, code, set }) => {
    switch (code) {
      case 'ZOD_VALIDATION': {
        set.status = 400
        return error.toHTTP()
      }
      case 'USE_CASE_VALIDATION': {
        set.status = 400 // TODO: Get dynamic status
        return error.toHttp()
      }
      case 'UNAUTHORIZED': {
        set.status = 401
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
  .use(getProfile)
