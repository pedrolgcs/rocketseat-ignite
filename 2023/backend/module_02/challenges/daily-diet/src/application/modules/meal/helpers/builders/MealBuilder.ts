import crypto from 'node:crypto'
import { Meal } from '@/application/modules/meal/entities'

class MealBuilder {
  private meal: Meal

  constructor(id: string = crypto.randomUUID()) {
    this.meal = Meal.create(
      {
        name: 'meal-name',
        description: 'meal-description',
        eatTime: new Date(),
        isDiet: true,
        userId: 'user-id',
      },
      id,
    )
  }

  public setName(name: string): this {
    this.meal.props.name = name
    return this
  }

  public setDescription(description: string | null): this {
    this.meal.props.description = description
    return this
  }

  public setEatTime(eatTime: Date): this {
    this.meal.props.eatTime = eatTime
    return this
  }

  public setIsDiet(isDiet: boolean): this {
    this.meal.props.isDiet = isDiet
    return this
  }

  public setUserId(userId: string): this {
    this.meal.props.userId = userId
    return this
  }

  public build(): Meal {
    return this.meal
  }
}

export { MealBuilder }
