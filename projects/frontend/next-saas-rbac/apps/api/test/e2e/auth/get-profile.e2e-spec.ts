import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

import { makeAccount } from '../../factories/make-account'

describe('[Auth] - Get Profile', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get profile', async () => {
    const user = await makeAccount()

    const token = app.jwt.sign(
      {},
      {
        sub: user.id,
        expiresIn: '1d',
      },
    )

    const sut = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(sut.statusCode).toEqual(200)

    expect(sut.body.user).toEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    )

    expect(token).toBeTruthy()
  })

  it('should not be able to get profile with invalid token', async () => {
    const sut = await request(app.server)
      .get('/profile')
      .set('Authorization', 'Bearer invalid')

    expect(sut.statusCode).toEqual(401)
  })
})
