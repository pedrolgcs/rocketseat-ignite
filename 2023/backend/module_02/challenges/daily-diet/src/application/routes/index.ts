import { FastifyInstance } from 'fastify'
import { mealRoutes } from '@/application/modules/meal/routers/meal-routes'
import { authRoutes } from '@/application/modules/user/routers/auth-routes'
import { userRoutes } from '@/application/modules/user/routers/user-routes'

async function routes(app: FastifyInstance) {
  app.get('/health', (request, reply) => {
    return reply.status(200).send({
      ...request.headers,
    })
  })

  app.register(userRoutes, { prefix: 'users' })

  app.register(authRoutes, { prefix: 'auth' })

  app.register(mealRoutes, { prefix: 'meals' })
}

export { routes }
