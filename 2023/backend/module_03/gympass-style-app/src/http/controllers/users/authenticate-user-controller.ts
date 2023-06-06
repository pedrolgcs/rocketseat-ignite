import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUserUseCase } from '@/use-cases/users'

class AuthenticateUserController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUserUserUseCase = makeAuthenticateUserUseCase()

    await authenticateUserUserUseCase.execute({ email, password })

    return reply.status(200).send()
  }
}

export { AuthenticateUserController }
