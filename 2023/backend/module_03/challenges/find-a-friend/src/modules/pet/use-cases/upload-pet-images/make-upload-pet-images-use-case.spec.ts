import { describe, it, expect, beforeEach } from 'vitest'
import { FakeStorageProvider } from '@/containers/providers/StorageProvider/fakes/FakeStorageProvider'
import * as Error from '@/errors/shared'
import { PetFactory } from '@/modules/pet/helpers/factories'
import {
  InMemoryPetsRepository,
  InMemoryPetImagesRepository,
} from '@/modules/pet/repositories/in-memory'
import { UploadPetImagesUseCase } from './upload-pet-images-use-case'

let sut: UploadPetImagesUseCase
let petsRepository: InMemoryPetsRepository
let petImagesRepository: InMemoryPetImagesRepository
let storageProvider: FakeStorageProvider

describe('[Pet] Create pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    petImagesRepository = new InMemoryPetImagesRepository()
    storageProvider = new FakeStorageProvider()
    sut = new UploadPetImagesUseCase(
      petsRepository,
      petImagesRepository,
      storageProvider,
    )
  })

  it('should be able to save a pet images', async () => {
    const newPet = PetFactory.default()

    await Promise.all([petsRepository.create(newPet)])

    const { pet } = await sut.execute({
      petId: newPet.id,
      imagesName: ['image.jpeg', 'image2.jpeg'],
    })

    expect(pet.images).toHaveLength(2)
  })

  it('should not be able to save images if pet not exists', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
        imagesName: ['image.jpeg', 'image2.jpeg'],
      }),
    ).rejects.toBeInstanceOf(Error.PetNotFound)
  })
})
