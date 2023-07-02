import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCheckInUseCase } from '@/use-cases/check-ins'

class CreateCheckInController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId } = request.user

    const paramsSchema = z.object({
      gymId: z.string().uuid(),
    })

    const bodySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { latitude, longitude } = bodySchema.parse(request.body)

    const { gymId } = paramsSchema.parse(request.params)

    const createCheckInUseCase = makeCreateCheckInUseCase()

    await createCheckInUseCase.execute({
      userId,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  }
}

export { CreateCheckInController }
