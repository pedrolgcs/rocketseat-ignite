import { FastifyInstance } from 'fastify'

async function routes(app: FastifyInstance) {
  app.get('/health', (request, reply) => {
    return reply.status(200).send({
      ...request.headers,
    })
  })
}

export { routes }
