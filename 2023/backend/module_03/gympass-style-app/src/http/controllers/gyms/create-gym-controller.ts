import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/gyms'

class CreateGymController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string(),
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { title, description, phone, latitude, longitude } = schema.parse(
      request.body,
    )

    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return reply.status(201).send()
  }
}

export { CreateGymController }
