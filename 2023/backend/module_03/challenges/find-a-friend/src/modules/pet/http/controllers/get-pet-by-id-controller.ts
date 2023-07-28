import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetByIdUseCase } from '@/modules/pet/use-cases/get-pet-by-id'
import { PetViewModel } from '@/modules/pet/view-models'

class GetPetByIdController {
  public async handler(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const getPetByIdUseCase = makeGetPetByIdUseCase()

    const { pet } = await getPetByIdUseCase.execute({
      petId: id,
    })

    const petToHTP = PetViewModel.toHTTP(pet)

    return reply.status(200).send({
      pet: petToHTP,
    })
  }
}

export { GetPetByIdController }
