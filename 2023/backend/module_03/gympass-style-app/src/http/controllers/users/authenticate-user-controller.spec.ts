import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

describe('[User - e2e] - Authenticate user controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email,
      password,
    })

    const sut = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    expect(sut.statusCode).toBe(200)

    expect(sut.body).toEqual({
      token: expect.any(String),
    })
  })
})
