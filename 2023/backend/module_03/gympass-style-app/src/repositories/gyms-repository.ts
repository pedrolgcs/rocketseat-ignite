import { Gym, Prisma } from '@prisma/client'

export type FindManyNearByParams = {
  latitude: number
  longitude: number
  maxDistance: number
}

interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearBy(params: FindManyNearByParams): Promise<Gym[]>
  searchMany(title: string, pagination: Pagination): Promise<Gym[]>
  create(gym: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }
