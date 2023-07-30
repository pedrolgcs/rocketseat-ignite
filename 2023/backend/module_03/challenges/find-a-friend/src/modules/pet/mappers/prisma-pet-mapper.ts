import {
  Pet as PrismaPet,
  AdoptionRequirement as PrismaAdoptionRequirement,
  PetImage as PrismaImage,
  Organization as PrismaOrganization,
} from '@prisma/client'
import { PrismaOrganizationMapper } from '@/modules/organization/mappers'
import { Pet } from '@/modules/pet/entities'
import {
  PrismaPetAdoptionRequirements,
  PrismaPetImageMapper,
} from '@/modules/pet/mappers'
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
  images?: PrismaImage[]
}

type PetDomainToPrisma = PrismaPet

class PrismaPetMapper {
  static toPrisma(pet: Pet): PetDomainToPrisma {
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
      created_at: pet.createdAt,
    }
  }

  static toDomain(pet: PrismaPetWithLoadRelations): Pet {
    const organization = PrismaOrganizationMapper.toDomain(pet.organization)

    const adoptionRequirements = pet.adoptionRequirements?.map((item) => {
      return PrismaPetAdoptionRequirements.toDomain(item)
    })

    const images = pet.images?.map((item) => {
      return PrismaPetImageMapper.toDomain(item)
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
        images,
        organization,
      },
      pet.id,
    )
  }
}

export { PrismaPetMapper }
