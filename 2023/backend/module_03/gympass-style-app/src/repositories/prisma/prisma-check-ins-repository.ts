import dayjs from 'dayjs'
import { Prisma, CheckIn } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CheckInsRepository } from '../check-ins-repository'

class PrismaCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findManyByUserId(
    userId: string,
    pagination: Pagination,
  ): Promise<CheckIn[]> {
    const { page, perPage } = pagination

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return checkIns
  }

  async findManyByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    })

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}

export { PrismaCheckInsRepository }
