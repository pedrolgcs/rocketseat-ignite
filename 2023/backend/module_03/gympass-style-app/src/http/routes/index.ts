import { FastifyInstance } from 'fastify'
import { sessionsRoutes } from './session-routes'
import { usersRoutes } from './users-routes'

async function routes(app: FastifyInstance) {
  app.get('/health', (request, reply) => {
    return reply.status(200).send({
      ...request.headers,
    })
  })

  app.register(usersRoutes, { prefix: '/users' })

  app.register(sessionsRoutes, { prefix: '/sessions' })
}

export { routes }
