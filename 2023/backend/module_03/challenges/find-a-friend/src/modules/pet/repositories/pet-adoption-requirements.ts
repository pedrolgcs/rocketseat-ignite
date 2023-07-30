import { AdoptionRequirement } from '@/modules/pet/entities'

interface PetAdoptionRequirements {
  create(adoptionRequirement: AdoptionRequirement): Promise<void>
  createMany(adoptionRequirements: AdoptionRequirement[]): Promise<void>
}

export { PetAdoptionRequirements }
