import { injectable, inject } from 'tsyringe'
import { IMealsRepository } from '@/application/modules/meal/repositories/IMealRepository'

type IRequest = {
  userId: string
}

type IResponse = {
  total: number
  totalInDiet: number
  totalNotInDiet: number
  bestSequenceDayInDiet: {
    date: Date
    amount: number
  }
}

@injectable()
class MealsSummaryUseCase {
  constructor(
    @inject('MealsRepository')
    private mealsRepository: IMealsRepository,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { userId } = request

    const meals = await this.mealsRepository.find(userId)

    const totalMeals = meals.length

    const totalMealsInDiet = meals.filter((meal) => meal.isDiet).length

    const totalMealNotInDiet = meals.filter((meal) => !meal.isDiet).length

    const bestSequenceDayInDiet =
      await this.mealsRepository.getBestIsDietSequenceDayByUser(userId)

    return {
      total: totalMeals,
      totalInDiet: totalMealsInDiet,
      totalNotInDiet: totalMealNotInDiet,
      bestSequenceDayInDiet,
    }
  }
}

export { MealsSummaryUseCase }
