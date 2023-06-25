import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case'

let sut: FetchNearbyGymsUseCase
let inMemoryGymsRepository: InMemoryGymsRepository

describe('[Gym] - Fetch Nearby Gyms', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: '123456789',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: '123456789',
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      latitude: -27.2092052,
      longitude: -49.6401091,
      maxDistance: 10,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
