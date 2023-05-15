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

describe('[User] - Create user', () => {
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

  it('should be able to create a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'user',
      email: 'user@email.com',
      avatarUrl: 'user.jpeg',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a new user if email already be taken', async () => {
    await request(app.server).post('/users').send({
      name: 'user',
      email: 'user@email.com',
      avatarUrl: 'user.jpeg',
    })

    const response = await request(app.server).post('/users').send({
      name: 'user',
      email: 'user@email.com',
      avatarUrl: 'user.jpeg',
    })

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 400,
      }),
    )
  })
})
