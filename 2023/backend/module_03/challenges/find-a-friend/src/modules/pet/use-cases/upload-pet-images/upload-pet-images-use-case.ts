import { StorageProvider } from '@/containers/providers/StorageProvider/storage-provider'
import * as Error from '@/errors/shared'
import { Pet, Image } from '@/modules/pet/entities'
import { PetsRepository, PetImagesRepository } from '@/modules/pet/repositories'

type Request = {
  petId: string
  imagesName: string[]
}

type Response = {
  pet: Pet
}

class UploadPetImagesUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petImagesRepository: PetImagesRepository,
    private storageProvider: StorageProvider,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { petId, imagesName } = request

    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new Error.PetNotFound()
    }

    const images = imagesName.map((name) => {
      return Image.create({
        name,
        petId: pet.id,
      })
    })

    pet.images = images

    await Promise.all(
      pet.images.map(async (image) => {
        await this.petImagesRepository.create(image)

        await this.storageProvider.saveFile(image.name, `pets/${petId}`)
      }),
    )

    return {
      pet,
    }
  }
}

export { UploadPetImagesUseCase }
