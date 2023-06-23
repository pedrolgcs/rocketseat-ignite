import crypto from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(title: string, pagination: Pagination): Promise<Gym[]> {
    const { page, perPage } = pagination

    return this.items
      .filter((item) =>
        item.title.toLowerCase().includes(title.toLocaleLowerCase()),
      )
      .slice((page - 1) * perPage, page * perPage)
  }

  async create(gym: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const newGym = {
      id: gym.id ?? crypto.randomUUID(),
      title: gym.title,
      description: gym.description ?? null,
      phone: gym.phone,
      latitude: new Prisma.Decimal(gym.latitude.toString()),
      longitude: new Prisma.Decimal(gym.longitude.toString()),
    }

    this.items.push(newGym)

    return newGym
  }
}

export { InMemoryGymsRepository }
