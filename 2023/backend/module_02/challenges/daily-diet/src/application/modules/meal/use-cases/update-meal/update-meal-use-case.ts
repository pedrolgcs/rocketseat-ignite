import { injectable, inject } from 'tsyringe'
import { IMealsRepository } from '@/application/modules/meal/repositories/IMealRepository'
import * as Error from './errors'

type IRequest = {
  id: string
  name: string
  description: string | null
  isDiet: boolean
  eatTime: Date
  userId: string
}

@injectable()
class UpdateMealUseCase {
  constructor(
    @inject('MealsRepository')
    private mealsRepository: IMealsRepository,
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const { id, name, description, eatTime, isDiet, userId } = request

    const mealToBeUpdated = await this.mealsRepository.findById(id)

    if (!mealToBeUpdated) {
      throw new Error.MealNotFound()
    }

    if (mealToBeUpdated.userId !== userId) {
      throw new Error.MealNotBelongToUser()
    }

    mealToBeUpdated.name = name
    mealToBeUpdated.description = description
    mealToBeUpdated.eatTime = eatTime
    mealToBeUpdated.isDiet = isDiet

    await this.mealsRepository.save(mealToBeUpdated)
  }
}

export { UpdateMealUseCase }
