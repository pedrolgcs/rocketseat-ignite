import crypto from 'node:crypto'
import dayjs from 'dayjs'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findManyByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.filter((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    return checkInOnSameDate
  }

  async findManyByUserId(
    userId: string,
    pagination: Pagination,
  ): Promise<CheckIn[]> {
    const { page, perPage } = pagination

    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * perPage, page * perPage)
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: data.id ?? crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}

export { InMemoryCheckInsRepository }
