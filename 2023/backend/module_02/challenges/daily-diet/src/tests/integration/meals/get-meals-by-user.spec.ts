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

describe('[Meal] - Get meals by user', () => {
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

  it('should be able to list a meals by user', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'email@gmail.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .send({
        name: 'meal-one',
        description: 'meal-description-one',
        eatTime: new Date(),
        isDiet: true,
      })
      .set('Cookie', cookies)

    await request(app.server)
      .post('/meals')
      .send({
        name: 'meal-two',
        description: 'meal-description-two',
        eatTime: new Date(),
        isDiet: true,
      })
      .set('Cookie', cookies)

    const getMealsByUserResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    expect(getMealsByUserResponse.body.meals).toHaveLength(2)
  })

  it('should not be able to list a meals that belong to another user', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'user-one@gmail.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    const createAnotherUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'user',
        email: 'user-two@gmail.com',
        avatarUrl: 'user.jpeg',
      })

    const anotherCookies = createAnotherUserResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .send({
        name: 'meal-one',
        description: 'meal-description-one',
        eatTime: new Date(),
        isDiet: true,
      })
      .set('Cookie', cookies)

    await request(app.server)
      .post('/meals')
      .send({
        name: 'meal-two',
        description: 'meal-description-two',
        eatTime: new Date(),
        isDiet: true,
      })
      .set('Cookie', anotherCookies)

    const getMealsByUserResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    expect(getMealsByUserResponse.body.meals).toHaveLength(1)
  })
})
