import { inject, injectable } from 'tsyringe'
import { Meal } from '@/application/modules/meal/entities'
import { IMealsRepository } from '@/application/modules/meal/repositories/IMealRepository'
import * as Error from './errors'

type IRequest = {
  id: string
  userId: string
}

@injectable()
class GetMealByIdUseCase {
  constructor(
    @inject('MealsRepository')
    private mealsRepository: IMealsRepository,
  ) {}

  public async execute(request: IRequest): Promise<Meal> {
    const { id, userId } = request

    const meal = await this.mealsRepository.findById(id)

    if (!meal) {
      throw new Error.MealNotFound()
    }

    if (meal.userId !== userId) {
      throw new Error.MealNotBelongToUser()
    }

    return meal
  }
}

export { GetMealByIdUseCase }
