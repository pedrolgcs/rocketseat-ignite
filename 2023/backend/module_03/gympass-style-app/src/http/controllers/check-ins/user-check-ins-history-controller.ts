import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/check-ins'

class UserCheckInsHistoryController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user

    const querySchema = z.object({
      page: z.coerce.number().min(1).default(1),
      perPage: z.coerce.number().min(1).default(10),
    })

    const { page, perPage } = querySchema.parse(request.query)

    const fetchUserCheckInsHistoryUseCase =
      makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId,
      pagination: {
        page,
        perPage,
      },
    })

    return reply.status(200).send({
      checkIns,
    })
  }
}

export { UserCheckInsHistoryController }
