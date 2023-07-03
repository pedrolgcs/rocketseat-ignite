import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/erros/AppError'

function verifyUserRole(roleToVerify: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      throw new AppError({
        message: 'Unauthorized.',
        statusCode: 403,
      })
    }
  }
}

export { verifyUserRole }
