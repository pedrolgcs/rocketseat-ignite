import { inject, injectable } from 'tsyringe'
import { Meal } from '@/application/modules/meal/entities'
import { IMealsRepository } from '@/application/modules/meal/repositories/IMealRepository'

type IRequest = {
  name: string
  description: string | null
  eatTime: Date
  isDiet: boolean
  userId: string
}

@injectable()
class CreateMealUseCase {
  constructor(
    @inject('MealsRepository')
    private mealRepository: IMealsRepository,
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const { name, description, eatTime, isDiet, userId } = request

    const meal = Meal.create({
      name,
      description,
      eatTime,
      isDiet,
      userId,
    })

    await this.mealRepository.create(meal)
  }
}

export { CreateMealUseCase }
