import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { MealsSummaryUseCase } from './meals-summary-use-case'

class MealsSummaryController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const mealsSummaryUseCase = container.resolve(MealsSummaryUseCase)

    const { sessionId } = request.cookies

    const response = await mealsSummaryUseCase.execute({ userId: sessionId! })

    return reply.status(200).send(response)
  }
}

export { MealsSummaryController }
