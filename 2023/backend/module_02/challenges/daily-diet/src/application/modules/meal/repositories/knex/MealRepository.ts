import { knex } from '@/application/lib/knex'
import { Meal } from '@/application/modules/meal/entities'
import { KnexMealMapper } from '@/application/modules/meal/mappers'
import { IMealsRepository } from '../IMealRepository'

class MealRepository implements IMealsRepository {
  async find(userId: string): Promise<Meal[]> {
    const findMeals = await knex('meals').select().where({
      user_id: userId,
    })

    const meals = findMeals.map(KnexMealMapper.toDomain)

    return meals
  }

  async findById(id: string): Promise<Meal | null> {
    const findMeal = await knex('meals')
      .select()
      .where({
        id,
      })
      .first()

    if (!findMeal) return null

    const meal = KnexMealMapper.toDomain(findMeal)

    return meal
  }

  async create(data: Meal): Promise<void> {
    const mealToBeCreate = KnexMealMapper.toKnex(data)

    await knex('meals').insert(mealToBeCreate)
  }

  async save(data: Meal): Promise<void> {
    const mealToBeUpdate = KnexMealMapper.toKnex(data)

    await knex('meals')
      .update({
        name: mealToBeUpdate.name,
        description: mealToBeUpdate.description,
        eat_time: mealToBeUpdate.eat_time,
        is_diet: mealToBeUpdate.is_diet,
      })
      .where({
        id: mealToBeUpdate.id,
      })
  }

  async delete(id: string): Promise<void> {
    await knex('meals').delete().where({
      id,
    })
  }
}

export { MealRepository }
