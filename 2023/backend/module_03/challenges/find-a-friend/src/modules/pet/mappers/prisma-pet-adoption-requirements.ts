import { AdoptionRequirement as PrismaAdoptionRequirement } from '@prisma/client'
import { AdoptionRequirement } from '@/modules/pet/entities'

class PrismaPetAdoptionRequirements {
  static toPrisma(item: AdoptionRequirement) {
    return {
      id: item.id,
      requirement: item.requirement,
      pet_id: item.petId,
    }
  }

  static toDomain(item: PrismaAdoptionRequirement) {
    return AdoptionRequirement.create(
      {
        requirement: item.requirement,
        petId: item.pet_id,
      },
      item.id,
    )
  }
}

export { PrismaPetAdoptionRequirements }
