import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories'

type Request = {
  query: string
  pagination: Pagination
}

type Response = {
  gyms: Gym[]
}

class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { query, pagination } = request

    const gyms = await this.gymsRepository.searchMany(query, pagination)

    return {
      gyms,
    }
  }
}

export { SearchGymsUseCase }
