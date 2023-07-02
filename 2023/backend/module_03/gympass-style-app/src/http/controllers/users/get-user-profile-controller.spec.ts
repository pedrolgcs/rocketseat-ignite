import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('[User - e2e] - Get user profile controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    const { token } = await createAndAuthenticateUser({
      app,
      email,
      password,
    })

    const sut = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(sut.statusCode).toBe(200)
    expect(sut.body.user).toEqual(
      expect.objectContaining({
        email,
      }),
    )
  })
})
