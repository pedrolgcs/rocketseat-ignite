import { PrismaPetsRepository } from '@/modules/pet/repositories/prisma'
import { GetPetByIdUseCase } from './get-pet-by-id-use-case'

function makeGetPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetByIdUseCase = new GetPetByIdUseCase(petsRepository)

  return getPetByIdUseCase
}

export { makeGetPetByIdUseCase }
