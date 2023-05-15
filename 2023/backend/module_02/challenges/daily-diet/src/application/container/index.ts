import { container } from 'tsyringe'
import { IMealsRepository } from '@/application/modules/meal/repositories/IMealRepository'
import { MealRepository } from '@/application/modules/meal/repositories/knex/MealRepository'
import { IUsersRepository } from '@/application/modules/user/repositories/IUsersRepository'
import { UsersRepository } from '@/application/modules/user/repositories/knex/UsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IMealsRepository>('MealsRepository', MealRepository)
