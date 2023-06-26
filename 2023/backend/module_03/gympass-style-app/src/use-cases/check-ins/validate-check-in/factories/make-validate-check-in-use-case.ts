import { PrismaCheckInsRepository } from '@/repositories/prisma'
import { ValidateCheckInUseCase } from '../validate-check-in-use-case'

function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(
    prismaCheckInsRepository,
  )

  return validateCheckInUseCase
}

export { makeValidateCheckInUseCase }
