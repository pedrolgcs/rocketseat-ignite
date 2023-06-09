import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories'

type Request = {
  title: string
  description: string | null
  phone: string
  latitude: number
  longitude: number
}

type Response = {
  gym: Gym
}

class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { title, description, phone, latitude, longitude } = request

    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}

export { CreateGymUseCase }
