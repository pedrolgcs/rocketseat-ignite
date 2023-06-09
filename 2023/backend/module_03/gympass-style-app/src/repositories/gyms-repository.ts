import { Gym, Prisma } from '@prisma/client'

interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(gym: Prisma.GymCreateInput): Promise<Gym>
}

export { GymsRepository }
