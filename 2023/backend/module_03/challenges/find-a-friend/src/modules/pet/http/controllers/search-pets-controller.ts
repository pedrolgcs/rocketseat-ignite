import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '@/modules/pet/use-cases/search-pets'
import { PetViewModel } from '@/modules/pet/view-models'

class SearchPetsController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      city: z.string().toLowerCase(),
    })

    const querySchema = z.object({
      age: z.enum(['young', 'adult', 'senior']).optional(),
      category: z.enum(['cat', 'dog', 'other']).optional(),
      energyLevel: z
        .enum(['very_low', 'low', 'medium', 'high', 'very_high'])
        .optional(),
      independenceLevel: z.enum(['low', 'medium', 'high']).optional(),
      size: z.enum(['small', 'medium', 'large']).optional(),
    })

    const { city } = paramsSchema.parse(request.params)

    const { age, category, energyLevel, independenceLevel, size } =
      querySchema.parse(request.query)

    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      category,
      energyLevel,
      independenceLevel,
      size,
    })

    const petsToHTTP = pets.map((pet) => PetViewModel.toHTTP(pet))

    return {
      pets: petsToHTTP,
    }
  }
}

export { SearchPetsController }
