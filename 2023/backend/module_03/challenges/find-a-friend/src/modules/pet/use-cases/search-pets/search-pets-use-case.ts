import { Pet } from '@/modules/pet/entities'
import { PetsRepository } from '@/modules/pet/repositories'

type Request = {
  city: string
}

type Response = {
  pets: Pet[]
}

class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { city } = request

    const pets = await this.petsRepository.searchMany({ city })

    return {
      pets,
    }
  }
}

export { SearchPetsUseCase }
