import { AuthenticateFromCodeUseCase } from '@/domain/store/application/use-cases'
import {
  DrizzleRestaurantsRepository,
  DrizzleUsersAuthenticateRepository,
} from '@/infra/db/repositories'

export function makeAuthenticateFromCodeUseCase() {
  const usersAuthenticateRepository = new DrizzleUsersAuthenticateRepository()
  const restaurantsRepository = new DrizzleRestaurantsRepository()

  return new AuthenticateFromCodeUseCase(
    usersAuthenticateRepository,
    restaurantsRepository,
  )
}
