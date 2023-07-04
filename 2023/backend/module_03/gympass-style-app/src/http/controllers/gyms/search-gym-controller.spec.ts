import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('[Gym - e2e] - Search gyms controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new gym', async () => {
    const { token } = await createAndAuthenticateUser({ app, role: 'ADMIN' })

    await Promise.all([
      prisma.gym.create({
        data: {
          title: 'Javascript Gym',
          description: 'Javascript description',
          phone: '1111111-1111',
          latitude: -23.576,
          longitude: -46.633,
        },
      }),

      prisma.gym.create({
        data: {
          title: 'TypeScript Gym',
          description: 'TypeScript description',
          phone: '1111111-1111',
          latitude: -23.576,
          longitude: -46.633,
        },
      }),
    ])

    const sut = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        query: 'TypeScript',
      })
      .send()

    expect(sut.statusCode).toBe(200)
    expect(sut.body.gyms).toHaveLength(1)
    expect(sut.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })
})
