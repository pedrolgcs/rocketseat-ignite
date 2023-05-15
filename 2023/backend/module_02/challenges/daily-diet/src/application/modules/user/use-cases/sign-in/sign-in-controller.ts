import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AppError } from '@/application/errors/AppError'
import { SignInUseCase } from './sign-in-use-case'

const signInBodySchema = z.object({
  sessionId: z.string(),
})

class SignInController {
  public async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<Response> {
    const body = signInBodySchema.safeParse(request.body)

    if (body.success === false) {
      throw new AppError({
        message: 'invalid params',
        friendlyMessage: 'Parâmetros inválidos',
        formError: body.error.issues,
        statusCode: 400,
      })
    }

    const { sessionId } = body.data

    const signIn = container.resolve(SignInUseCase)

    await signIn.execute({ sessionId })

    reply.cookie('sessionId', sessionId, {
      path: '/',
    })

    return reply.status(200).send()
  }
}

export { SignInController }
