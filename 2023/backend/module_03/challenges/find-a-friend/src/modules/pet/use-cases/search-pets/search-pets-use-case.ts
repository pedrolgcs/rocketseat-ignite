import { Pet } from '@/modules/pet/entities'
import { PetsRepository } from '@/modules/pet/repositories'
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Size,
  Category,
} from '@/types/Pet'

type Request = {
  city: string
  age?: Age
  energyLevel?: EnergyLevel
  size?: Size
  independenceLevel?: IndependenceLevel
  category?: Category
}

type Response = {
  pets: Pet[]
}

class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { city, age, energyLevel, size, independenceLevel, category } =
      request

    const pets = await this.petsRepository.searchMany({
      city,
      age,
      energyLevel,
      size,
      independenceLevel,
      category,
    })

    return {
      pets,
    }
  }
}

export { SearchPetsUseCase }
