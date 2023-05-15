import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AppError } from '@/application/errors/AppError'
import { DeleteMealUseCase } from './delete-meal-use-case'

const deleteMealParamsSchema = z.object({
  id: z.string().uuid(),
})

class DeleteMealController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const params = deleteMealParamsSchema.safeParse(request.params)

    if (params.success === false) {
      throw new AppError({
        message: 'invalid params',
        friendlyMessage: 'Parâmetros inválidos',
        formError: params.error.issues,
        statusCode: 400,
      })
    }

    const { id } = params.data

    const { sessionId } = request.cookies

    const deleteMealUseCase = container.resolve(DeleteMealUseCase)

    await deleteMealUseCase.execute({
      id,
      userId: sessionId!,
    })

    return reply.status(200).send()
  }
}

export { DeleteMealController }
