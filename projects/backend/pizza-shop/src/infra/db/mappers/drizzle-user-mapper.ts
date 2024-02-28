import { InferSelectModel } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/store/enterprise/entities'

import { users } from '../schema'

type DrizzleUser = InferSelectModel<typeof users>

export class DrizzleUserMapper {
  static toDomain(raw: DrizzleUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        role: raw.role,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(user: User): DrizzleUser {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone ?? null,
      role: user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt ?? null,
    }
  }
}
