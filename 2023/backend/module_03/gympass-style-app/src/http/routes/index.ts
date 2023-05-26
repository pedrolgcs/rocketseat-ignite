import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users-routes'

async function routes(app: FastifyInstance) {
  app.get('/health', (request, reply) => {
    return reply.status(200).send({
      ...request.headers,
    })
  })

  app.register(usersRoutes, { prefix: '/users' })
}

export { routes }
