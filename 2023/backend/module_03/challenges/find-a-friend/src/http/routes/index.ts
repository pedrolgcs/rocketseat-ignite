import { FastifyInstance } from 'fastify'
import { organizationRoutes } from '@/modules/organization/http/routers'
import { petRoutes } from '@/modules/pet/http/routers'

async function routes(app: FastifyInstance) {
  app.get('/health', (request, reply) => {
    return reply.status(200).send({
      ...request.headers,
    })
  })

  app.register(organizationRoutes)

  app.register(petRoutes)
}

export { routes }
