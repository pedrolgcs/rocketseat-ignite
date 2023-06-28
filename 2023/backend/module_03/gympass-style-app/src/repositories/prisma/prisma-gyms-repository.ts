import { Gym, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { GymsRepository, FindManyNearByParams } from '../gyms-repository'

class PrismaGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearBy(params: FindManyNearByParams): Promise<Gym[]> {
    const { latitude, longitude, maxDistance } = params

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${maxDistance}
    `

    return gyms
  }

  async searchMany(title: string, pagination: Pagination): Promise<Gym[]> {
    const { page, perPage } = pagination

    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return gyms
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}

export { PrismaGymsRepository }
