import { PrismaCheckInsRepository } from '@/repositories/prisma'
import { GetUserMetricsUseCase } from '../get-user-metrics-use-case'

function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    prismaCheckInsRepository,
  )

  return getUserMetricsUseCase
}

export { makeGetUserMetricsUseCase }
