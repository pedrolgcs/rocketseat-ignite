import { Meal } from '@/application/modules/meal/entities'

export class MealViewModel {
  static toHTTP(meal: Meal) {
    return {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      eatTime: new Date(meal.eatTime),
      isDiet: meal.isDiet,
      createAt: meal.createdAt ? new Date(meal.createdAt) : null,
    }
  }
}
