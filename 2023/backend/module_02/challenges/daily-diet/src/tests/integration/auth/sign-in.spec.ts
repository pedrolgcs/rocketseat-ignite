import { execSync } from 'node:child_process'
import request from 'supertest'
import {
  expect,
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from 'vitest'
import { app } from '@/application/app'

describe('[Auth] - Sign in', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:latest')
  })

  afterEach(() => {
    execSync('npm run knex migrate:rollback --all')
  })

  it('should be able to sign in', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'user@email.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    const [cookie] = cookies

    const [, sessionId] = cookie.split(';')[0].split('=')

    const response = await request(app.server).post('/auth/sign-in').send({
      sessionId,
    })

    expect(response.statusCode).toEqual(200)
  })
})
