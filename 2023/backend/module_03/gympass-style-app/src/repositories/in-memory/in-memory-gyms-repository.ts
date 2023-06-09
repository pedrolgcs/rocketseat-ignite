import crypto from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(gym: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const newGym = {
      id: gym.id ?? crypto.randomUUID(),
      title: gym.title,
      description: gym.description ?? null,
      phone: gym.phone,
      latitude: new Prisma.Decimal(gym.latitude as number),
      longitude: new Prisma.Decimal(gym.longitude as number),
    }

    this.gyms.push(newGym)

    return newGym
  }
}

export { InMemoryGymsRepository }
