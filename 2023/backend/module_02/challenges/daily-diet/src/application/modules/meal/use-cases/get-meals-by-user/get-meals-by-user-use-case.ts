import { injectable, inject } from 'tsyringe'
import { Meal } from '@/application/modules/meal/entities'
import { IMealsRepository } from '@/application/modules/meal/repositories/IMealRepository'

type IRequest = {
  userId: string
}

@injectable()
class GetMealsByUserUseCase {
  constructor(
    @inject('MealsRepository')
    private mealsRepository: IMealsRepository,
  ) {}

  public async execute(request: IRequest): Promise<Meal[]> {
    const { userId } = request

    const meals = await this.mealsRepository.find(userId)

    return meals
  }
}

export { GetMealsByUserUseCase }
