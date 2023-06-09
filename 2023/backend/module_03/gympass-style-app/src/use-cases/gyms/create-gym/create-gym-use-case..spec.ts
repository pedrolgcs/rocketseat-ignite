import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory'
import { CreateGymUseCase } from './create-gym-use-case'

let sut: CreateGymUseCase
let inMemoryGymsRepository: InMemoryGymsRepository

describe('[Gym] - Create gym', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
