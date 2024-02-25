import { Elysia } from 'elysia'

import { createRestaurantsRouter } from './create-restaurants/create-restaurants-router'
import { healthCheckRouter } from './health-check/health-check-router'

export const routes = new Elysia()
  .use(healthCheckRouter)
  .use(createRestaurantsRouter)
