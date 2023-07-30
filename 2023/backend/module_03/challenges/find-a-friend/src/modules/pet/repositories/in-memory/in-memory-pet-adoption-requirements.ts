import { AdoptionRequirement } from '@/modules/pet/entities'
import { PetAdoptionRequirements } from '../pet-adoption-requirements'

class InMemoryPetAdoptionRequirements implements PetAdoptionRequirements {
  public items: AdoptionRequirement[] = []

  async create(data: AdoptionRequirement): Promise<void> {
    this.items.push(data)
  }

  async createMany(data: AdoptionRequirement[]): Promise<void> {
    this.items.push(...data)
  }
}

export { InMemoryPetAdoptionRequirements }
