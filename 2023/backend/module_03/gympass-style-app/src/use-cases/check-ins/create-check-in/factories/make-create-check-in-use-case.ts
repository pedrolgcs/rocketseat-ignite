import {
  PrismaCheckInsRepository,
  PrismaGymsRepository,
} from '@/repositories/prisma'
import { CreateCheckInUseCase } from '../create-check-in-use-case'

function makeCreateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()

  const createCheckInUseCase = new CreateCheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return createCheckInUseCase
}

export { makeCreateCheckInUseCase }
