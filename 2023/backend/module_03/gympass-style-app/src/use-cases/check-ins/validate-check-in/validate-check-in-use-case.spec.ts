import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory'
import * as Error from './errors'
import { ValidateCheckInUseCase } from './validate-check-in-use-case'

let sut: ValidateCheckInUseCase
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

describe('[CheckIn] - Validate check-in', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(inMemoryCheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      user_id: 'user_id',
      gym_id: 'gym_id',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(Error.ResourceNotFound)
  })

  it('should not be able to validate check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      user_id: 'user_id',
      gym_id: 'gym_id',
    })

    vi.advanceTimersByTime(1000 * 60 * 21) // 21 minutes

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error.LateCheckInValidation)
  })
})
