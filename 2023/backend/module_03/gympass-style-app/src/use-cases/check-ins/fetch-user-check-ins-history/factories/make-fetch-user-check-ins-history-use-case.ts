import { PrismaCheckInsRepository } from '@/repositories/prisma'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history-use-case'

function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    prismaCheckInsRepository,
  )

  return fetchUserCheckInsHistoryUseCase
}

export { makeFetchUserCheckInsHistoryUseCase }
