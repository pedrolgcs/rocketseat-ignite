import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories'

type Request = {
  latitude: number
  longitude: number
  maxDistance: number
}

type Response = {
  gyms: Gym[]
}

class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { latitude, longitude, maxDistance } = request

    const gyms = await this.gymsRepository.findManyNearBy({
      latitude,
      longitude,
      maxDistance,
    })

    return {
      gyms,
    }
  }
}

export { FetchNearbyGymsUseCase }
