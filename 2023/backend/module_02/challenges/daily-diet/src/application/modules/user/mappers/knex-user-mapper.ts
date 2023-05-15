import { Tables } from 'knex/types/tables'
import { User } from '@/application/modules/user/entities'

type KnexUser = Tables['users']

class KnexUserMapper {
  static toKnex(user: User): KnexUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatarUrl,
      created_at: user.createdAt!,
    }
  }

  static toDomain(raw: KnexUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        avatarUrl: raw.avatar_url,
        createdAt: raw.created_at,
      },
      raw.id,
    )
  }
}

export { KnexUserMapper }
