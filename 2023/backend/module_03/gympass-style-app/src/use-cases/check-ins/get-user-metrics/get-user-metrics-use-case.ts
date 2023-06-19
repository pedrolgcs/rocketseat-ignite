import { CheckInsRepository } from '@/repositories'

type Request = {
  userId: string
}

type Response = {
  checkInsByUser: number
}

class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { userId } = request

    const checkInsByUser = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsByUser,
    }
  }
}

export { GetUserMetricsUseCase }
