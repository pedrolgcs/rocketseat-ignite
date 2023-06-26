import dayjs from 'dayjs'
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories'
import * as Error from './errors'

type Request = {
  checkInId: string
}

type Response = {
  checkIn: CheckIn
}

class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { checkInId } = request

    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new Error.ResourceNotFound()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new Error.LateCheckInValidation()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}

export { ValidateCheckInUseCase }
