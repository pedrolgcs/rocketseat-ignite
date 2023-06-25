import { PrismaGymsRepository } from '@/repositories/prisma'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms-use-case'

function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return fetchNearbyGymsUseCase
}

export { makeFetchNearbyGymsUseCase }
