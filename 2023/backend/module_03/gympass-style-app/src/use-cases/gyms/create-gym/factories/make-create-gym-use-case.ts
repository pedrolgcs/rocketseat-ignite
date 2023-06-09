import { PrismaGymsRepository } from '@/repositories/prisma'
import { CreateGymUseCase } from '../create-gym-use-case'

function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}

export { makeCreateGymUseCase }
