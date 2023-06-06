import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/use-cases'

class AuthenticateUserController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const prismaUsersRepository = new PrismaUsersRepository()

    const authenticateUserUserUseCase = new AuthenticateUserUseCase(
      prismaUsersRepository,
    )

    await authenticateUserUserUseCase.execute({ email, password })

    return reply.status(200).send()
  }
}

export { AuthenticateUserController }
