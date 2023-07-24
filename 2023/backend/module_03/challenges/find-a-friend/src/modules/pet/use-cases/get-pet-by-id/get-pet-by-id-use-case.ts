import * as Error from '@/errors/shared'
import { Pet } from '@/modules/pet/entities'
import { PetsRepository } from '@/modules/pet/repositories'

type Request = {
  petId: string
}

type Response = {
  pet: Pet
}

class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { petId } = request

    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new Error.PetNotFound()
    }

    return {
      pet,
    }
  }
}

export { GetPetByIdUseCase }
