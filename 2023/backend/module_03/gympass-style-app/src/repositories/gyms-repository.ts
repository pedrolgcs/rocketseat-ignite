import { Gym, Prisma } from '@prisma/client'

interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(gym: Prisma.GymUncheckedCreateInput): Promise<Gym>
}

export { GymsRepository }
