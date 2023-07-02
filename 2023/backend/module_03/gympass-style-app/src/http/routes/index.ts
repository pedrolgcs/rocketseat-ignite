import { FastifyInstance } from 'fastify'
import { checkInsRoutes } from './check-ins-routes'
import { gymsRoutes } from './gyms-routes'
import { usersRoutes } from './users-routes'

async function routes(app: FastifyInstance) {
  app.get('/health', (request, reply) => {
    return reply.status(200).send({
      ...request.headers,
    })
  })

  app.register(usersRoutes)

  app.register(gymsRoutes)

  app.register(checkInsRoutes)
}

export { routes }
