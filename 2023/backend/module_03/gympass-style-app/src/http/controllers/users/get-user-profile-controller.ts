import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from '@/use-cases/users'

class GetUserProfileController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user

    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.execute({
      userId,
    })

    Reflect.deleteProperty(user, 'password_hash')

    return reply.status(200).send({ user })
  }
}

export { GetUserProfileController }
