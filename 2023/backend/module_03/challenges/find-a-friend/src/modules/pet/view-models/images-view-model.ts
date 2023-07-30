import { Image } from '@/modules/pet/entities'

class ImagesViewModel {
  static toHTTP(adoptionRequirements: Image[]) {
    return adoptionRequirements.map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: `http://localhost:3333/tmp/pets/${item.petId}/${item.name}`,
      }
    })
  }
}

export { ImagesViewModel }
