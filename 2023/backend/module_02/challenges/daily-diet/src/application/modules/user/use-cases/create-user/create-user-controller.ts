import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AppError } from '@/application/errors/AppError'
import { CreateUserUseCase } from './create-user-use-case'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
})

class CreateUserController {
  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Response> {
    const body = createUserBodySchema.safeParse(request.body)

    if (body.success === false) {
      throw new AppError({
        message: 'invalid params',
        friendlyMessage: 'Parâmetros inválidos',
        formError: body.error.issues,
        statusCode: 400,
      })
    }

    const { name, email, avatarUrl } = body.data

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const { user } = await createUserUseCase.execute({
      name,
      email,
      avatarUrl,
    })

    reply.cookie('sessionId', user.id, {
      path: '/',
    })

    return reply.status(201).send()
  }
}

export { CreateUserController }
