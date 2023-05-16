import { Tables } from 'knex/types/tables'
import { Meal } from '@/application/modules/meal/entities'

type KnexMeal = Tables['meals']

class KnexMealMapper {
  static toKnex(meal: Meal): KnexMeal {
    return {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      eat_time: meal.eatTime,
      is_diet: meal.isDiet,
      user_id: meal.userId,
      created_at: meal.createdAt!,
    }
  }

  static toDomain(raw: KnexMeal): Meal {
    return Meal.create(
      {
        name: raw.name,
        description: raw.description,
        eatTime: new Date(raw.eat_time),
        isDiet: raw.is_diet,
        userId: raw.user_id,
        createdAt: raw.created_at,
      },
      raw.id,
    )
  }
}

export { KnexMealMapper }
