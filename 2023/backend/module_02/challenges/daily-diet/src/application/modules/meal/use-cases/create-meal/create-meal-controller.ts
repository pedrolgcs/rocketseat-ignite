import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AppError } from '@/application/errors/AppError'
import { CreateMealUseCase } from './create-meal-use-case'

const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string().nullable().default(null),
  eatTime: z.coerce.date(),
  isDiet: z.boolean(),
})

class CreateMealController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = createMealBodySchema.safeParse(request.body)

    if (body.success === false) {
      throw new AppError({
        message: 'invalid params',
        friendlyMessage: 'Parâmetros inválidos',
        formError: body.error.issues,
        statusCode: 400,
      })
    }

    const { name, description, eatTime, isDiet } = body.data

    const { sessionId } = request.cookies

    const createMealUseCase = container.resolve(CreateMealUseCase)

    await createMealUseCase.execute({
      name,
      description,
      eatTime,
      isDiet,
      userId: sessionId!,
    })

    return reply.status(201).send()
  }
}

export { CreateMealController }
