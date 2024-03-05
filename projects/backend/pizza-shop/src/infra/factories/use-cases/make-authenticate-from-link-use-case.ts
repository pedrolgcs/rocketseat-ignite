import { AuthenticateFromLinkUseCase } from '@/domain/store/application/use-cases'
import {
  DrizzleRestaurantsRepository,
  DrizzleUsersAuthenticateRepository,
} from '@/infra/db/repositories'

export function makeAuthenticateFromLinkUseCase() {
  const usersAuthenticateRepository = new DrizzleUsersAuthenticateRepository()
  const restaurantsRepository = new DrizzleRestaurantsRepository()

  return new AuthenticateFromLinkUseCase(
    usersAuthenticateRepository,
    restaurantsRepository,
  )
}
