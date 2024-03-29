import * as Error from '@/errors/shared'
import { OrganizationsRepository } from '@/modules/organization/repositories'
import { Pet, AdoptionRequirement } from '@/modules/pet/entities'
import {
  PetsRepository,
  PetAdoptionRequirements,
} from '@/modules/pet/repositories'
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
  energyLevel: EnergyLevel
  independenceLevel: IndependenceLevel
  necessarySpace: NecessarySpace
  organization_id: string
  adoptionRequirements: Array<string>
}

type Response = {
  pet: Pet
}

class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petAdoptionRequirements: PetAdoptionRequirements,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
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
      energyLevel,
      independenceLevel,
      necessarySpace,
      organization,
    })

    const petAdoptionRequirements = adoptionRequirements.map((requirement) => {
      return AdoptionRequirement.create({
        petId: pet.id,
        requirement,
      })
    })

    pet.adoptionRequirements = petAdoptionRequirements

    await Promise.all([
      await this.petsRepository.create(pet),
      await this.petAdoptionRequirements.createMany(petAdoptionRequirements),
    ])

    return {
      pet,
    }
  }
}

export { CreatePetUseCase }
