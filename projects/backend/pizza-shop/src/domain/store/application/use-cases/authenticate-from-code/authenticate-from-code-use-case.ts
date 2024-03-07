import dayjs from 'dayjs'

import { Either, left, right } from '@/core/either'
import {
  RestaurantsRepository,
  UsersAuthenticateRepository,
} from '@/domain/store/application/repositories'

import {
  AuthenticationCodeExpiredError,
  AuthenticationCodeNotFoundError,
} from '../_erros'

type Request = {
  code: string
}

type Response = Either<
  AuthenticationCodeNotFoundError | AuthenticationCodeExpiredError,
  {
    userId: string
    restaurantId: string | null
  }
>

export class AuthenticateFromCodeUseCase {
  constructor(
    private readonly usersAuthenticateRepository: UsersAuthenticateRepository,
    private readonly restaurantsRepository: RestaurantsRepository,
  ) {}

  public async execute(params: Request): Promise<Response> {
    const { code } = params

    const userAuthentication =
      await this.usersAuthenticateRepository.findByCode(code)

    if (!userAuthentication) {
      return left(new AuthenticationCodeNotFoundError())
    }

    const daysSinceAuthLinkWasCreated = dayjs().diff(
      userAuthentication.createdAt,
      'days',
    )

    if (daysSinceAuthLinkWasCreated > 7) {
      return left(new AuthenticationCodeExpiredError())
    }

    const restaurant = await this.restaurantsRepository.findByManagerId(
      userAuthentication.userId.toString(),
    )

    return right({
      userId: userAuthentication.userId.toString(),
      restaurantId: restaurant?.id.toString() ?? null,
    })
  }
}
