import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory'
import { GetUserMetricsUseCase } from './get-user-metrics-use-case'

let sut: GetUserMetricsUseCase
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

describe('[CheckIn] - Get user metrics', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository)
  })

  it('should be able to count check ins by user', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'user-02',
      gym_id: 'gym-02',
    })

    const { checkInsByUser } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsByUser).toBe(2)
  })
})
