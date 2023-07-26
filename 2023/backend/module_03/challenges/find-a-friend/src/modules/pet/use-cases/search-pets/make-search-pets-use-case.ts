import { PrismaPetsRepository } from '@/modules/pet/repositories/prisma'
import { SearchPetsUseCase } from './search-pets-use-case'

function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsUseCase = new SearchPetsUseCase(petsRepository)

  return searchPetsUseCase
}

export { makeSearchPetsUseCase }
