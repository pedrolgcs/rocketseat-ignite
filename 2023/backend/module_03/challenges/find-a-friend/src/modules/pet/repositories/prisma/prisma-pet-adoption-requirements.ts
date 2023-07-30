import { prisma } from '@/lib/prisma'
import { AdoptionRequirement } from '@/modules/pet/entities'
import { PrismaPetAdoptionRequirements } from '@/modules/pet/mappers'
import { PetAdoptionRequirements } from '../pet-adoption-requirements'

class PrismaPetAdoptionRequirement implements PetAdoptionRequirements {
  async create(requirement: AdoptionRequirement): Promise<void> {
    const adoptionRequirementToPrisma =
      PrismaPetAdoptionRequirements.toPrisma(requirement)

    await prisma.adoptionRequirement.create({
      data: adoptionRequirementToPrisma,
    })
  }

  async createMany(requirements: AdoptionRequirement[]): Promise<void> {
    const adoptionRequirementsToPrisma = requirements.map((requirement) => {
      return PrismaPetAdoptionRequirements.toPrisma(requirement)
    })

    await prisma.adoptionRequirement.createMany({
      data: adoptionRequirementsToPrisma,
      skipDuplicates: true,
    })
  }
}

export { PrismaPetAdoptionRequirement }
