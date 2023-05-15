import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'
import { AppError } from '@/application/errors/AppError'
import { MealViewModel } from '@/application/modules/meal/view-models/'
import { GetMealByIdUseCase } from './get-meal-by-id-use-case'

const getMealParamsSchema = z.object({
  id: z.string().uuid(),
})

class GetMealByIdController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const params = getMealParamsSchema.safeParse(request.params)

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

    const getMealByIdUseCase = container.resolve(GetMealByIdUseCase)

    const meal = await getMealByIdUseCase.execute({
      id,
      userId: sessionId!,
    })

    const mealToView = MealViewModel.toHTTP(meal)

    return reply.status(200).send({ meal: mealToView })
  }
}

export { GetMealByIdController }
