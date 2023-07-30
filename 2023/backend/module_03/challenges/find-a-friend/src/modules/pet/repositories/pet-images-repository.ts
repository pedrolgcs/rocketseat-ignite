import { Image } from '@/modules/pet/entities'

interface PetImagesRepository {
  create(images: Image): Promise<void>
  createMany(images: Image[]): Promise<void>
}

export { PetImagesRepository }
