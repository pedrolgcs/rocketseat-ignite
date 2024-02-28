import { SendAuthenticateLinkUseCase } from '@/domain/store/application/use-cases'
import {
  DrizzleUsersAuthenticateRepository,
  DrizzleUsersRepository,
} from '@/infra/db/repositories'
import { MailtrapMailProvider } from '@/infra/providers/mail'

export function makeSendAuthenticateLinkUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const usersAuthenticateRepository = new DrizzleUsersAuthenticateRepository()
  const smtpProvider = new MailtrapMailProvider()
  return new SendAuthenticateLinkUseCase(
    usersRepository,
    usersAuthenticateRepository,
    smtpProvider,
  )
}
