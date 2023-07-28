import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/modules/pet/use-cases/create-pet'

class CreatePetController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      name: z.string(),
      about: z.string(),
      category: z.enum(['cat', 'dog', 'other']),
      age: z.enum(['young', 'adult', 'senior']),
      size: z.enum(['small', 'medium', 'large']),
      energyLevel: z.enum(['very_low', 'low', 'medium', 'high', 'very_high']),
      independenceLevel: z.enum(['low', 'medium', 'high']),
      necessarySpace: z.enum(['small', 'medium', 'large']),
      organization_id: z.string().uuid(),
      adoptionRequirements: z.array(z.string()),
    })

    const {
      name,
      about,
      category,
      age,
      size,
      energyLevel,
      independenceLevel,
      necessarySpace,
      organization_id,
      adoptionRequirements,
    } = bodySchema.parse(request.body)

    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      about,
      category,
      age,
      size,
      energyLevel,
      independenceLevel,
      necessarySpace,
      organization_id,
      adoptionRequirements,
    })

    return reply.status(201).send()
  }
}

export { CreatePetController }
