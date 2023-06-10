import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories'

type Request = {
  userId: string
  page: number
}

type Response = {
  checkIns: CheckIn[]
}

class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { userId, page } = request

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}

export { FetchUserCheckInsHistoryUseCase }
