import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('[CheckIn - e2e] - Create check-in controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new check-in', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '1111111-1111',
        latitude: -23.576,
        longitude: -46.633,
      },
    })

    const sut = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.576,
        longitude: -46.633,
      })

    expect(sut.statusCode).toBe(201)
  })
})
