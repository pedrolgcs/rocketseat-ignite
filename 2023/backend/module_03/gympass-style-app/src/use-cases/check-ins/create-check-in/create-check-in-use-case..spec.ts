import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  InMemoryCheckInsRepository,
  InMemoryGymsRepository,
} from '@/repositories/in-memory'
import { CreateCheckInUseCase } from './create-check-in-use-case'
import * as Error from './errors'

let sut: CreateCheckInUseCase
let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository

describe('[CheckIn] - Create check-in', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateCheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository,
    )

    // create a new gym
    await inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Gym 01 description',
      phone: '123456789',
      latitude: -6.433559,
      longitude: -36.643044,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'any_user_id',
      userLatitude: -6.433559,
      userLongitude: -36.643044,
    })

    expect(checkIn).toBeTruthy()
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'any_user_id',
      userLatitude: -6.433559,
      userLongitude: -36.643044,
    })

    vi.setSystemTime(new Date(2023, 0, 11, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'any_user_id',
      userLatitude: -6.433559,
      userLongitude: -36.643044,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'any_user_id',
      userLatitude: -6.433559,
      userLongitude: -36.643044,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'any_user_id',
        userLatitude: -6.433559,
        userLongitude: -36.643044,
      }),
    ).rejects.toBeInstanceOf(Error.MaxNumberOfCheckIns)
  })

  it('should not be able to check in when gym is not found', async () => {
    await expect(() =>
      sut.execute({
        gymId: 'wrong_gym_id',
        userId: 'any_user_id',
        userLatitude: -6.433559,
        userLongitude: -36.643044,
      }),
    ).rejects.toBeInstanceOf(Error.ResourceNotFound)
  })

  it('should not be able to check in on distant gym', async () => {
    const latitudeBiggerThanHundredMeters = -6.4538865
    const longitudeBiggerThanHundredMeters = -36.6361452

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'any_user_id',
        userLatitude: latitudeBiggerThanHundredMeters,
        userLongitude: longitudeBiggerThanHundredMeters,
      }),
    ).rejects.toBeInstanceOf(Error.MaxDistance)
  })
})
