import { prisma } from '@/lib/prisma'
import { Image } from '@/modules/pet/entities'
import { PrismaPetImageMapper } from '@/modules/pet/mappers'
import { PetImagesRepository } from '../pet-images-repository'

class PrismaPetImagesRepository implements PetImagesRepository {
  async create(image: Image): Promise<void> {
    const imageToPrisma = PrismaPetImageMapper.toPrisma(image)

    await prisma.petImage.create({
      data: imageToPrisma,
    })
  }

  async createMany(images: Image[]): Promise<void> {
    const imagesToPrisma = images.map((image) => {
      return PrismaPetImageMapper.toPrisma(image)
    })

    await prisma.petImage.createMany({
      data: imagesToPrisma,
      skipDuplicates: true,
    })
  }
}

export { PrismaPetImagesRepository }
