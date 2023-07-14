import * as Error from '@/errors/shared'
import { OrganizationsRepository } from '@/modules/organization/repositories'
import { Pet } from '@/modules/pet/entities'
import { PetsRepository } from '@/modules/pet/repositories'
import {
  Age,
  Size,
  EnergyLevel,
  IndependenceLevel,
  NecessarySpace,
  Category,
} from '@/types/Pet'

type Request = {
  name: string
  about: string
  category: Category
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  necessarySpace: NecessarySpace
  organization_id: string
}

type Response = {
  pet: Pet
}

class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const {
      name,
      about,
      category,
      age,
      size,
      energy_level,
      independence_level,
      necessarySpace,
      organization_id,
    } = request

    const organization = await this.organizationsRepository.findById(
      organization_id,
    )

    if (!organization) {
      throw new Error.OrganizationNotFound()
    }

    const pet = Pet.create({
      name,
      about,
      category,
      age,
      size,
      energy_level,
      independence_level,
      necessarySpace,
      organization,
    })

    await this.petsRepository.create(pet)

    return {
      pet,
    }
  }
}

export { CreatePetUseCase }
