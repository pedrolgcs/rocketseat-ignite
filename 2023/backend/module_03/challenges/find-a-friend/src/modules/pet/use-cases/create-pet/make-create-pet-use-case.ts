import { PrismaOrganizationsRepository } from '@/modules/organization/repositories/prisma'
import {
  PrismaPetsRepository,
  PrismaPetAdoptionRequirement,
} from '@/modules/pet/repositories/prisma'
import { CreatePetUseCase } from './create-pet-use-case'

function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petAdoptionRequirement = new PrismaPetAdoptionRequirement()
  const organizationsRepository = new PrismaOrganizationsRepository()

  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    petAdoptionRequirement,
    organizationsRepository,
  )

  return createPetUseCase
}

export { makeCreatePetUseCase }
