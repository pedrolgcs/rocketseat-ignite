import { PetImage as PrismaPetImage } from '@prisma/client'
import { Image } from '@/modules/pet/entities'

class PrismaPetImageMapper {
  static toPrisma(image: Image) {
    return {
      id: image.id,
      name: image.name,
      pet_id: image.petId,
    }
  }

  static toDomain(image: PrismaPetImage) {
    return Image.create(
      {
        name: image.name,
        petId: image.pet_id,
      },
      image.id,
    )
  }
}

export { PrismaPetImageMapper }
