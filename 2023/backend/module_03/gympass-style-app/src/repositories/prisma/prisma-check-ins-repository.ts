import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

class PrismaCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }

  findManyByUserId(userId: string): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }

  findManyByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }
}

export { PrismaCheckInsRepository }
