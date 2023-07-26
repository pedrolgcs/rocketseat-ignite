import {
  Pet as PrismaPet,
  AdoptionRequirement as PrismaAdoptionRequirement,
  Organization as PrismaOrganization,
  Prisma,
} from '@prisma/client'
import { PrismaOrganizationMapper } from '@/modules/organization/mappers'
import { Pet, AdoptionRequirement } from '@/modules/pet/entities'
import {
  Age,
  Category,
  EnergyLevel,
  IndependenceLevel,
  Size,
  NecessarySpace,
} from '@/types/Pet'

type PrismaPetWithLoadRelations = PrismaPet & {
  organization: PrismaOrganization
  adoptionRequirements?: PrismaAdoptionRequirement[]
}

type PetDomainToPrisma = PrismaPet & {
  adoptionRequirements: Prisma.AdoptionRequirementCreateManyPetInput[]
}

class PrismaPetMapper {
  static toPrisma(pet: Pet): PetDomainToPrisma {
    const adoptionRequirements = pet.adoptionRequirements.map((requirement) => {
      return {
        id: requirement.id,
        requirement: requirement.requirement,
      }
    })

    return {
      id: pet.id,
      name: pet.name,
      about: pet.about,
      age: pet.age,
      category: pet.category,
      energy_level: pet.energyLevel,
      independence_level: pet.independenceLevel,
      size: pet.size,
      place: pet.necessarySpace,
      organization_id: pet.organization.id,
      adoptionRequirements,
      created_at: pet.createdAt,
    }
  }

  static toDomain(pet: PrismaPetWithLoadRelations): Pet {
    const organizationToDomain = PrismaOrganizationMapper.toDomain(
      pet.organization,
    )

    const adoptionRequirements = pet.adoptionRequirements?.map((item) => {
      return AdoptionRequirement.create(
        {
          petId: item.pet_id,
          requirement: item.requirement,
        },
        item.id,
      )
    })

    return Pet.create(
      {
        name: pet.name,
        about: pet.about,
        age: pet.age as Age,
        category: pet.category as Category,
        energyLevel: pet.energy_level as EnergyLevel,
        independenceLevel: pet.independence_level as IndependenceLevel,
        necessarySpace: pet.place as NecessarySpace,
        size: pet.size as Size,
        adoptionRequirements,
        organization: organizationToDomain,
      },
      pet.id,
    )
  }
}

export { PrismaPetMapper }
