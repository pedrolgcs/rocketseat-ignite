import { UserAuthenticate } from '@/domain/store/enterprise/entities'

export abstract class UsersAuthenticateRepository {
  abstract create(auth: UserAuthenticate): Promise<void | null>
  abstract findByCode(code: string): Promise<UserAuthenticate | null>
}
