import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  ManagersRepository,
  RestaurantesRepository,
} from '@/domain/store/application/repositories'
import { Restaurante } from '@/domain/store/enterprise/entities'

import { ManagerNotFoundError } from '../_erros'

type Request = {
  name: string
  description?: string
  managerId: string
}

type Response = Either<
  ManagerNotFoundError,
  {
    restaurante: Restaurante
  }
>

export class CreateRestaurantUseCase {
  constructor(
    private readonly restaurantsRepository: RestaurantesRepository,
    private readonly managersRepository: ManagersRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { name, description, managerId } = request

    const manager = await this.managersRepository.findById(managerId)

    if (!manager) {
      return left(new ManagerNotFoundError())
    }

    const restaurant = Restaurante.create({
      name,
      description,
      managerId: new UniqueEntityID(managerId),
    })

    await this.restaurantsRepository.create(restaurant)

    return right({ restaurante: restaurant })
  }
}
