import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

class PrismaGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }

  create(gym: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.')
  }
}

export { PrismaGymsRepository }
