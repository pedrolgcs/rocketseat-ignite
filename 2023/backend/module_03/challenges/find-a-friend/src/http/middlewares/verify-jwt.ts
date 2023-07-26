import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/errors/AppError'

async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    throw new AppError({
      friendlyMessage: 'Não autorizado.',
      message: 'Unauthorized.',
      statusCode: 401,
    })
  }
}

export { verifyJWT }
