import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('[Gym - e2e] - Create gym controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new gym', async () => {
    const { token } = await createAndAuthenticateUser({ app })

    const sut = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '1111111-1111',
        latitude: -23.576,
        longitude: -46.633,
      })

    expect(sut.statusCode).toBe(201)
  })
})
