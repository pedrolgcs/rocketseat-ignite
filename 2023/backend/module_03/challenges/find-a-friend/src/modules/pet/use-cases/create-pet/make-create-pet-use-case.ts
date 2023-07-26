import { PrismaOrganizationsRepository } from '@/modules/organization/repositories/prisma'
import { PrismaPetsRepository } from '@/modules/pet/repositories/prisma'
import { CreatePetUseCase } from './create-pet-use-case'

function makeCreatePetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()

  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    organizationsRepository,
  )

  return createPetUseCase
}

export { makeCreatePetUseCase }
