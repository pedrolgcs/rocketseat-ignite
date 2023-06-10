import { CheckIn, Prisma } from '@prisma/client'

interface CheckInsRepository {
  findManyByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}

export { CheckInsRepository }
