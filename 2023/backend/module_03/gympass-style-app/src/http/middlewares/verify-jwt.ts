import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/erros/AppError'

async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    throw new AppError({
      message: 'Unauthorized.',
      statusCode: 401,
    })
  }
}

export { verifyJWT }
