import { execSync } from 'node:child_process'
import crypto from 'node:crypto'
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

describe('[Meal] - Delete meal', () => {
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

  it('should be able to delete a meal', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'email@gmail.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .send({
        name: 'meal',
        description: 'meal-description',
        eatTime: new Date(),
        isDiet: true,
      })
      .set('Cookie', cookies)

    const mealResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const { meals } = mealResponse.body

    const meal = meals[0]

    await request(app.server).delete(`/meals/${meal.id}`).set('Cookie', cookies)

    const mealsBeforeDeletedResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    expect(mealsBeforeDeletedResponse.body.meals).toHaveLength(0)
  })

  it('should not be able to update a non existing meal', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'email@gmail.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    const response = await request(app.server)
      .delete(`/meals/${crypto.randomUUID()}`)
      .set('Cookie', cookies)

    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'meal not found',
        statusCode: 400,
      }),
    )
  })

  it('should not be able to update a meal that does not belong to user', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'email@gmail.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server)
      .post('/meals')
      .send({
        name: 'meal',
        description: 'meal-description',
        eatTime: new Date(),
        isDiet: true,
      })
      .set('Cookie', cookies)

    const createSecondUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'second',
        email: 'second@gmail.com',
        avatarUrl: 'second.jpeg',
      })

    const cookiesToSecondUser = createSecondUserResponse.get('Set-Cookie')

    const mealResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const { meals } = mealResponse.body

    const meal = meals[0]

    const response = await request(app.server)
      .delete(`/meals/${meal.id}`)
      .set('Cookie', cookiesToSecondUser)

    expect(response.statusCode).toEqual(401)
  })
})
