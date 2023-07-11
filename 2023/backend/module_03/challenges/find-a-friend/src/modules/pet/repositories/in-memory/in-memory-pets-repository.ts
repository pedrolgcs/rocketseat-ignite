import { Pet } from '@/modules/pet/entities'
import { PetsRepository } from '../pets-repository'

class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(organization: Pet): Promise<void> {
    this.items.push(organization)
  }
}

export { InMemoryPetsRepository }
