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

describe('[Meal] - Get meal by id', () => {
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

  it('should be able to get a meal by id', async () => {
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

    const mealResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)

    const { meals } = mealResponse.body

    const meal = meals[0]

    const getMealByIdResponse = await request(app.server)
      .get(`/meals/${meal.id}`)
      .set('Cookie', cookies)

    expect(getMealByIdResponse.body).toEqual({
      meal: expect.objectContaining({
        name: 'meal-one',
        description: 'meal-description-one',
      }),
    })
  })

  it('should not be able to get a meal if it does not exist', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'user',
      email: 'email@gmail.com',
      avatarUrl: 'user.jpeg',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    const getMealByIdResponse = await request(app.server)
      .get(`/meals/${crypto.randomUUID()}`)
      .set('Cookie', cookies)

    expect(getMealByIdResponse.body).toEqual(
      expect.objectContaining({
        message: 'meal not found',
        statusCode: 400,
      }),
    )
  })

  it('should not be able to get a meal if it does not belong to the user', async () => {
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
      .get(`/meals/${meal.id}`)
      .set('Cookie', cookiesToSecondUser)

    expect(response.statusCode).toEqual(401)
  })
})
