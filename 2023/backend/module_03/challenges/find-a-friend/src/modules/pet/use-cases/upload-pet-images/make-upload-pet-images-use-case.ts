import { DiskStorageProvider } from '@/containers/providers/StorageProvider/implementations/DiskStorageProvider'
import {
  PrismaPetsRepository,
  PrismaPetImagesRepository,
} from '@/modules/pet/repositories/prisma'
import { UploadPetImagesUseCase } from './upload-pet-images-use-case'

function makeUploadPetImagesUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petImagesRepository = new PrismaPetImagesRepository()
  const storageProvider = new DiskStorageProvider()

  const uploadPetImagesUseCase = new UploadPetImagesUseCase(
    petsRepository,
    petImagesRepository,
    storageProvider,
  )

  return uploadPetImagesUseCase
}

export { makeUploadPetImagesUseCase }
