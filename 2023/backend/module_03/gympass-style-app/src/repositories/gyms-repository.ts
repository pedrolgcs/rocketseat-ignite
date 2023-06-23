import { Gym, Prisma } from '@prisma/client'

interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(title: string, pagination: Pagination): Promise<Gym[]>
  create(gym: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }
