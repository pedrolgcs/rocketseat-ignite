import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory'
import { SearchGymsUseCase } from './search-gyms-use-case'

let sut: SearchGymsUseCase
let inMemoryGymsRepository: InMemoryGymsRepository

describe('[Gym] - Search gyms', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to search a gym by title', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    await inMemoryGymsRepository.create({
      id: 'gym-02',
      title: 'Gym 2',
      description: 'Gym 2 description',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    await inMemoryGymsRepository.create({
      id: 'gym-02',
      title: 'another title',
      description: 'Gym 2 description',
      phone: '123456789',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'gym',
      pagination: {
        page: 1,
        perPage: 10,
      },
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 1' }),
      expect.objectContaining({ title: 'Gym 2' }),
    ])
  })

  it('should be able to fetch paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        id: `gym-${i}`,
        title: `Gym ${i}`,
        description: 'Gym description',
        phone: '123456789',
        latitude: -6.433559,
        longitude: -36.643044,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      pagination: {
        page: 2,
        perPage: 20,
      },
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })
})
