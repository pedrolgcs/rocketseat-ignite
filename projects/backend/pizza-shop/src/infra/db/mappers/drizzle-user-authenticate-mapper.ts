import { InferSelectModel } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserAuthenticate } from '@/domain/store/enterprise/entities'

import { authLinks } from '../schema'

type DrizzleAuthLinks = InferSelectModel<typeof authLinks>

export class DrizzleUserAuthenticateMapper {
  static toDomain(raw: DrizzleAuthLinks): UserAuthenticate {
    return UserAuthenticate.create(
      {
        code: raw.code,
        userId: new UniqueEntityID(raw.userId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(user: UserAuthenticate): DrizzleAuthLinks {
    return {
      id: user.id.toString(),
      code: user.code,
      userId: user.userId.toString(),
      createdAt: user.createdAt,
    }
  }
}
