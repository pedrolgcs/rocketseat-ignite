import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/check-ins'

class UserMetrics {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user

    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const { checkInsByUser } = await getUserMetricsUseCase.execute({
      userId,
    })

    return reply.status(200).send({
      checkInsCount: checkInsByUser,
    })
  }
}

export { UserMetrics }
