import { FastifyRequest, FastifyReply } from 'fastify'
import { container } from 'tsyringe'
import { MealViewModel } from '@/application/modules/meal/view-models/'
import { GetMealsByUserUseCase } from './get-meals-by-user-use-case'

class GetMealsByUserController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies

    const getMealsByUserUseCase = container.resolve(GetMealsByUserUseCase)

    const mealsByUser = await getMealsByUserUseCase.execute({
      userId: sessionId!,
    })

    const meals = mealsByUser.map((meal) => MealViewModel.toHTTP(meal))

    return reply.status(200).send({ meals })
  }
}

export { GetMealsByUserController }
