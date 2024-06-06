import request from 'supertest'
import { makeAccount } from 'test/factories/make-account'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

describe('[Auth] - Authenticate with Password', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate with password', async () => {
    await makeAccount({
      email: 'pedro@gmail.com',
      password: '123456',
    })

    const sut = await request(app.server).post('/sessions/password').send({
      email: 'pedro@gmail.com',
      password: '123456',
    })

    expect(sut.statusCode).toEqual(200)

    expect(sut.body).toEqual({
      token: expect.any(String),
    })
  })
})
