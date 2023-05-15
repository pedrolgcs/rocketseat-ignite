import { injectable, inject } from 'tsyringe'
import { IMealsRepository } from '@/application/modules/meal/repositories/IMealRepository'
import * as Error from './errors'

type IRequest = {
  id: string
  userId: string
}

@injectable()
class DeleteMealUseCase {
  constructor(
    @inject('MealsRepository')
    private mealRepository: IMealsRepository,
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const { id, userId } = request

    const meal = await this.mealRepository.findById(id)

    if (!meal) {
      throw new Error.MealNotFound()
    }

    if (meal.userId !== userId) {
      throw new Error.MealNotBelongToUser()
    }

    await this.mealRepository.delete(id)
  }
}

export { DeleteMealUseCase }
