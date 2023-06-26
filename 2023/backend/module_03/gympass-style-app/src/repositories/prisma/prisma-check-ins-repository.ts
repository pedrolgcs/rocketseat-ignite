import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'

class PrismaCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  findById(id: string): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  findManyByUserId(userId: string): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }

  findManyByUserIdOnDate(userId: string, date: Date): Promise<CheckIn[]> {
    throw new Error('Method not implemented.')
  }

  countByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }
}

export { PrismaCheckInsRepository }
