import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/gyms'

class NearbyGymsController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
      latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
      maxDistance: z.coerce.number().default(10),
    })

    const { latitude, longitude, maxDistance } = querySchema.parse(
      request.query,
    )

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      latitude,
      longitude,
      maxDistance,
    })

    return reply.status(200).send({
      gyms,
    })
  }
}

export { NearbyGymsController }
