import { execSync } from 'node:child_process'
import dayjs from 'dayjs'
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

describe('[Meal] - Summary', () => {
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

  it('should be able to get meals summary', async () => {
    const toDay = dayjs().startOf('day').toDate()
    const tomorrow = dayjs().startOf('day').add(1, 'day').toDate()

    const createUserOneResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'user',
        email: 'user-one@gmail.com',
        avatarUrl: 'user.jpeg',
      })

    const cookiesFromUserOne = createUserOneResponse.get('Set-Cookie')

    const createUserTwoResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'user',
        email: 'user-two@gmail.com',
        avatarUrl: 'user.jpeg',
      })

    const cookiesFromUserTwo = createUserTwoResponse.get('Set-Cookie')

    await Promise.all([
      request(app.server)
        .post('/meals')
        .send({
          name: 'pizza',
          description: 'chicken pizza',
          eatTime: toDay,
          isDiet: false,
        })
        .set('Cookie', cookiesFromUserOne),

      request(app.server)
        .post('/meals')
        .send({
          name: 'chicken',
          description: 'chicken sandwich',
          eatTime: toDay,
          isDiet: true,
        })
        .set('Cookie', cookiesFromUserOne),

      request(app.server)
        .post('/meals')
        .send({
          name: 'meat',
          description: 'meat sandwich',
          eatTime: toDay,
          isDiet: true,
        })
        .set('Cookie', cookiesFromUserOne),

      request(app.server)
        .post('/meals')
        .send({
          name: 'meat',
          description: 'chicken sandwich',
          eatTime: tomorrow,
          isDiet: true,
        })
        .set('Cookie', cookiesFromUserOne),

      request(app.server)
        .post('/meals')
        .send({
          name: 'meat',
          description: 'meat sandwich',
          eatTime: toDay,
          isDiet: true,
        })
        .set('Cookie', cookiesFromUserTwo),
    ])

    const response = await request(app.server)
      .get('/meals/summary')
      .set('Cookie', cookiesFromUserOne)

    expect(response.body).toEqual(
      expect.objectContaining({
        total: 4,
        totalInDiet: 3,
        totalNotInDiet: 1,
        bestSequenceDayInDiet: expect.objectContaining({
          date: toDay.toISOString(),
          amount: 2,
        }),
      }),
    )
  })
})
