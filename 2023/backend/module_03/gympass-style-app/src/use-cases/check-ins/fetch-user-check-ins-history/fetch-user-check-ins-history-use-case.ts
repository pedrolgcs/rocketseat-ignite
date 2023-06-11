import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories'

type Request = {
  userId: string
  pagination: Pagination
}

type Response = {
  checkIns: CheckIn[]
}

class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { userId, pagination } = request

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      pagination,
    )

    return {
      checkIns,
    }
  }
}

export { FetchUserCheckInsHistoryUseCase }
