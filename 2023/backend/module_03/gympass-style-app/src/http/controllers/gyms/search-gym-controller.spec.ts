import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
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

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Javascript description',
        phone: '1111111-1111',
        latitude: -23.576,
        longitude: -46.633,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'TypeScript description',
        phone: '1111111-1111',
        latitude: -23.576,
        longitude: -46.633,
      })

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
