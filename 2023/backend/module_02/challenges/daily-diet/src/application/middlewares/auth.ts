import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/application/errors/AppError'

async function auth(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    throw new AppError({
      message: 'unauthorized',
      friendlyMessage: 'Usuário não autenticado',
      formError: null,
      statusCode: 401,
    })
  }
}

export { auth }
