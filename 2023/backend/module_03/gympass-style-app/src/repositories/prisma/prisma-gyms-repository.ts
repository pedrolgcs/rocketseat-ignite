import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, FindManyNearByParams } from '../gyms-repository'

class PrismaGymsRepository implements GymsRepository {
  public items: Gym[] = []

  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }

  findManyNearBy(params: FindManyNearByParams): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  searchMany(title: string, pagination: Pagination): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

  create(gym: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }
}

export { PrismaGymsRepository }
