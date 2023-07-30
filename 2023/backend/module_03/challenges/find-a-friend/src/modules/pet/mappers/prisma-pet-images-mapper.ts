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

  static toDomain(image: PrismaPetImage[]) {
    return image.map((item) => {
      return Image.create(
        {
          name: item.name,
          petId: item.pet_id,
        },
        item.id,
      )
    })
  }
}

export { PrismaPetImageMapper }
