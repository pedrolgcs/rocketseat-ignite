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

describe('[Meal] - Create meal', () => {
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

  it('should be able to create a new meal', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'email@gmail.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    const response = await request(app.server)
      .post('/meals')
      .send({
        name: 'meal',
        description: 'meal-description',
        eatTime: new Date(),
        isDiet: true,
      })
      .set('Cookie', cookies)

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a new meal if not have sessionId', async () => {
    const response = await request(app.server).post('/meals').send({
      name: 'meal',
      description: 'meal-description',
      eatTime: new Date(),
      isDiet: 'invalid-param',
    })

    expect(response.statusCode).toEqual(401)
  })
})
