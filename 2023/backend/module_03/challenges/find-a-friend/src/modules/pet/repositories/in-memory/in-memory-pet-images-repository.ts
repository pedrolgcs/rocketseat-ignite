import { Image } from '@/modules/pet/entities'
import { PetImagesRepository } from '../pet-images-repository'

class InMemoryPetImagesRepository implements PetImagesRepository {
  public items: Image[] = []

  async create(images: Image): Promise<void> {
    this.items.push(images)
  }

  async createMany(images: Image[]): Promise<void> {
    this.items.push(...images)
  }
}

export { InMemoryPetImagesRepository }
