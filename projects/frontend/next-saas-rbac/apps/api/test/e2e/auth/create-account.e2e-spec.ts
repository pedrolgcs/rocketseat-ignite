import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

describe('[Auth] - Create Account', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new account', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Pedro Henrique',
      email: 'pedro@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
