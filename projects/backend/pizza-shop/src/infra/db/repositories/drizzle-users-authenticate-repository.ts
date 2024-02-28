import { UsersAuthenticateRepository } from '@/domain/store/application/repositories'
import { UserAuthenticate } from '@/domain/store/enterprise/entities'

import { db } from '../connection'
import { DrizzleUserAuthenticateMapper } from '../mappers'
import { authLinks } from '../schema'

export class DrizzleUsersAuthenticateRepository
  implements UsersAuthenticateRepository
{
  async create(auth: UserAuthenticate): Promise<void | null> {
    const raw = DrizzleUserAuthenticateMapper.toDrizzle(auth)
    await db.insert(authLinks).values(raw)
  }

  async findByCode(code: string): Promise<UserAuthenticate | null> {
    const authentication = await db.query.authLinks.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.code, code)
      },
    })
    if (!authentication) return null
    return DrizzleUserAuthenticateMapper.toDomain(authentication)
  }
}
