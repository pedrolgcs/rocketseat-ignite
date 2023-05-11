import { FastifyReply, FastifyRequest } from 'fastify'

async function auth(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}

export { auth }
