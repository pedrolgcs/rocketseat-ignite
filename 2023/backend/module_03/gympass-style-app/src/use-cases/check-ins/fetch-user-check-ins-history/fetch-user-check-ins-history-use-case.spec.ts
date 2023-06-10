import { describe, it, expect, beforeEach } from 'vitest'
import {
  InMemoryCheckInsRepository,
  InMemoryGymsRepository,
} from '@/repositories/in-memory'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history-use-case'

let sut: FetchUserCheckInsHistoryUseCase
let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository

describe('[CheckIn] - Fetch user check-ins history', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(inMemoryCheckInsRepository)

    // create a new gym
    await inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Gym 01 description',
      phone: '123456789',
      latitude: -6.433559,
      longitude: -36.643044,
    })
  })

  it('should be able to fetch check-ins history', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated user check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
