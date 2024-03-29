import { CheckIn } from '@prisma/client'
import { CheckInsRepository, GymsRepository } from '@/repositories'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import * as Error from './errors'

type Request = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type Response = {
  checkIn: CheckIn
}

class CreateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { userId, gymId, userLatitude, userLongitude } = request

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new Error.ResourceNotFound()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error.MaxDistance()
    }

    const checkInOnSameDay =
      await this.checkInsRepository.findManyByUserIdOnDate(userId, new Date())

    const MAX_CHECK_INS_PER_DAY = 1

    if (checkInOnSameDay.length >= MAX_CHECK_INS_PER_DAY) {
      throw new Error.MaxNumberOfCheckIns()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}

export { CreateCheckInUseCase }
