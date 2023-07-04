import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('[CheckIn - e2e] - User metrics controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a user metrics', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '1111111-1111',
        latitude: -23.576,
        longitude: -46.633,
      },
    })

    await Promise.all([
      prisma.checkIn.create({
        data: {
          gym_id: gym.id,
          user_id: user.id,
        },
      }),

      prisma.checkIn.create({
        data: {
          gym_id: gym.id,
          user_id: user.id,
        },
      }),
    ])

    const sut = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(sut.statusCode).toBe(200)
    expect(sut.body.checkInsCount).toEqual(2)
  })
})
