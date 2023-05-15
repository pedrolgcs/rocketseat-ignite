import crypto from 'node:crypto'
import dayjs from 'dayjs'
import { Meal } from '@/application/modules/meal/entities'
import { MealBuilder } from '@/application/modules/meal/helpers/builders'

type MealFields = {
  id?: string
  name: string
  description: string
  eatTime: Date
  isDiet: boolean
  userId: string
}

class MealFactory {
  static default(): Meal {
    return new MealBuilder('user-id')
      .setName('name')
      .setDescription('description')
      .setEatTime(new Date())
      .setIsDiet(true)
      .setUserId('user-id')
      .build()
  }

  static createUserFromFields({
    id,
    name,
    description,
    eatTime,
    isDiet,
    userId,
  }: MealFields): Meal {
    return new MealBuilder(id)
      .setName(name)
      .setDescription(description)
      .setEatTime(eatTime)
      .setIsDiet(isDiet)
      .setUserId(userId)
      .build()
  }

  static createRandomUsers(count: number): Meal[] {
    const meals = []

    for (let i = 0; i < count; i++) {
      meals.push(
        new MealBuilder()
          .setName(`name ${i}`)
          .setDescription(`description ${i}`)
          .setEatTime(dayjs().add(i, 'hour').toDate())
          .setIsDiet(Boolean(Math.round(Math.random())))
          .setUserId(crypto.randomUUID())
          .build(),
      )
    }

    return meals
  }
}

export { MealFactory }
