import { describe, it, expect, beforeEach } from 'vitest'
import * as Error from '@/errors/shared'
import { PetFactory } from '@/modules/pet/helpers/factories'
import { InMemoryPetsRepository } from '@/modules/pet/repositories/in-memory'
import { GetPetByIdUseCase } from './get-pet-by-id-use-case'

let sut: GetPetByIdUseCase
let petsRepository: InMemoryPetsRepository

describe('[Pet] Create pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
    const newPet = PetFactory.default()

    await Promise.all([petsRepository.create(newPet)])

    const { pet } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet).toEqual(newPet)
  })

  it('should not be able to get a pet by id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(Error.PetNotFound)
  })
})
