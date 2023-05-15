import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AppError } from '@/application/errors/AppError'
import { UpdateMealUseCase } from './update-meal-use-case'

const updateMealBodySchema = z.object({
  name: z.string(),
  description: z.string().nullable().default(null),
  isDiet: z.boolean(),
  eatTime: z.coerce.date(),
})

const updateMealParamsSchema = z.object({
  id: z.string().uuid(),
})

class UpdateMealController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = updateMealBodySchema.safeParse(request.body)

    if (body.success === false) {
      throw new AppError({
        message: 'invalid params',
        friendlyMessage: 'Parâmetros inválidos',
        formError: body.error.issues,
        statusCode: 400,
      })
    }

    const params = updateMealParamsSchema.safeParse(request.params)

    if (params.success === false) {
      throw new AppError({
        message: 'invalid params',
        friendlyMessage: 'Parâmetros inválidos',
        formError: params.error.issues,
        statusCode: 400,
      })
    }

    const { name, description, eatTime, isDiet } = body.data

    const { id } = params.data

    const { sessionId } = request.cookies

    const createUserUseCase = container.resolve(UpdateMealUseCase)

    await createUserUseCase.execute({
      id,
      name,
      description,
      eatTime,
      isDiet,
      userId: sessionId!,
    })

    return reply.status(200).send()
  }
}

export { UpdateMealController }
