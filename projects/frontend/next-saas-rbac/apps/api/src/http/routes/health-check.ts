import type { FastifyInstance } from 'fastify'

export async function healthCheck(app: FastifyInstance) {
  app.get('/health-check', async (request, reply) => {
    const addressInfo = app.server.address()

    return reply.status(200).send({
      status: 'ok',
      info: addressInfo,
    })
  })
}
