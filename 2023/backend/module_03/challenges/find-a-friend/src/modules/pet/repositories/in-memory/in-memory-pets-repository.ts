import { Pet } from '@/modules/pet/entities'
import { PetsRepository, SearchManyParams } from '../pets-repository'

class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async searchMany(params: SearchManyParams): Promise<Pet[]> {
    const { city, age, energyLevel, size, independenceLevel, category } = params

    let pets = this.items.filter((item) => item.organization.city === city)

    if (age) {
      pets = pets.filter((item) => item.age === age)
    }

    if (energyLevel) {
      pets = pets.filter((item) => item.energyLevel === energyLevel)
    }

    if (size) {
      pets = pets.filter((item) => item.size === size)
    }

    if (independenceLevel) {
      pets = pets.filter((item) => item.independenceLevel === independenceLevel)
    }

    if (category) {
      pets = pets.filter((item) => item.category === category)
    }

    return pets
  }

  async create(organization: Pet): Promise<void> {
    this.items.push(organization)
  }
}

export { InMemoryPetsRepository }
