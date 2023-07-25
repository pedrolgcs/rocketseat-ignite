import {
  Pet as PrismaPet,
  Organization as PrismaOrganization,
} from '@prisma/client'
import { PrismaOrganizationMapper } from '@/modules/organization/mappers'
import { Pet } from '@/modules/pet/entities'
import {
  Age,
  Category,
  EnergyLevel,
  IndependenceLevel,
  Size,
  NecessarySpace,
} from '@/types/Pet'

type PetWithOrganization = PrismaPet & {
  organization: PrismaOrganization
}

class PrismaPetMapper {
  static toPrisma(pet: Pet): PrismaPet {
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

  static toDomain(pet: PetWithOrganization): Pet {
    const organizationToDomain = PrismaOrganizationMapper.toDomain(
      pet.organization,
    )

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
        organization: organizationToDomain,
      },
      pet.id,
    )
  }
}

export { PrismaPetMapper }
