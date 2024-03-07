import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  RestaurantsRepository,
  UsersRepository,
} from '@/domain/store/application/repositories'
import { Restaurant } from '@/domain/store/enterprise/entities'

import { ManagerNotFoundError } from '../_erros'

type Request = {
  name: string
  description?: string
  managerId: string
}

type Response = Either<
  ManagerNotFoundError,
  {
    restaurant: Restaurant
  }
>

export class CreateRestaurantUseCase {
  constructor(
    private readonly restaurantsRepository: RestaurantsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { name, description, managerId } = request

    const manager = await this.usersRepository.findById(managerId)

    if (!manager || manager.role !== 'manager') {
      return left(new ManagerNotFoundError())
    }

    const restaurant = Restaurant.create({
      name,
      description,
      managerId: new UniqueEntityID(managerId),
    })

    await this.restaurantsRepository.create(restaurant)

    return right({ restaurant })
  }
}
