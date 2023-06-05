import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '@/use-cases'

class CreateUserController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const prismaUsersRepository = new PrismaUsersRepository()

    const createUserUseCase = new CreateUserUseCase(prismaUsersRepository)

    await createUserUseCase.execute({ name, email, password })

    return reply.status(201).send()
  }
}

export { CreateUserController }
