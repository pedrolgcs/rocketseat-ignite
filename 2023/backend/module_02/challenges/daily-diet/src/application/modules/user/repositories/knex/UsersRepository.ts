import { knex } from '@/application/lib/knex'
import { User } from '@/application/modules/user/entities'
import { KnexUserMapper } from '@/application/modules/user/mappers'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  async findById(id: string) {
    const findUser = await knex('users')
      .select()
      .where({
        id,
      })
      .first()

    if (!findUser) return null

    const user = KnexUserMapper.toDomain(findUser)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const findUser = await knex('users')
      .select()
      .where({
        email,
      })
      .first()

    if (!findUser) return null

    const user = KnexUserMapper.toDomain(findUser)

    return user
  }

  async create(data: User) {
    const userToBeCreate = KnexUserMapper.toKnex(data)

    await knex('users').insert(userToBeCreate)
  }
}

export { UsersRepository }
