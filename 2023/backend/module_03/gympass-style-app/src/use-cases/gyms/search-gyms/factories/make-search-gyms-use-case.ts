import { PrismaGymsRepository } from '@/repositories/prisma'
import { SearchGymsUseCase } from '../search-gyms-use-case'

function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository)

  return searchGymsUseCase
}

export { makeSearchGymsUseCase }
