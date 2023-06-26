import { CheckIn, Prisma } from '@prisma/client'

interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  findManyByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]>
  findManyByUserId(userId: string, pagination: Pagination): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
}

export { CheckInsRepository }
