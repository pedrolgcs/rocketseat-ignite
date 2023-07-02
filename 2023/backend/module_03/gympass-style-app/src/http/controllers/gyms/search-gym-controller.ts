import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/gyms'

class SearchGymController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      query: z.string(),
      page: z.coerce.number().min(1).default(1),
      perPage: z.coerce.number().min(1).default(10),
    })

    const { query, page, perPage } = querySchema.parse(request.query)

    const searchGymsUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
      query,
      pagination: {
        page,
        perPage,
      },
    })

    return reply.status(200).send({
      gyms,
    })
  }
}

export { SearchGymController }
