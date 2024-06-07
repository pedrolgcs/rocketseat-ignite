import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

import { makeAccount } from '../../factories/make-account'
import { makeToken } from '../../factories/make-token'

describe('[Auth] - Reset Password', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to reset password', async () => {
    const user = await makeAccount({
      password: 'old-password',
    })

    const recoverPasswordToken = await makeToken({
      userId: user.id,
      type: 'PASSWORD_RECOVER',
    })

    const sut = await request(app.server).post('/password/reset').send({
      code: recoverPasswordToken.id,
      password: 'updated-password',
    })

    const getNewSession = await request(app.server)
      .post('/sessions/password')
      .send({
        email: user.email,
        password: 'updated-password',
      })

    expect(sut.statusCode).toEqual(204)

    expect(getNewSession.body).toEqual({
      token: expect.any(String),
    })
  })
})
