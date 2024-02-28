import { eq } from 'drizzle-orm'

import { UsersRepository } from '@/domain/store/application/repositories'
import { User } from '@/domain/store/enterprise/entities'

import { db } from '../connection'
import { DrizzleUserMapper } from '../mappers'
import { users } from '../schema'

export class DrizzleUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.id, id)
      },
    })
    if (!user) return null
    return DrizzleUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.query.users.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.email, email)
      },
    })
    if (!user) return null
    return DrizzleUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const raw = DrizzleUserMapper.toDrizzle(user)
    await db.insert(users).values(raw)
  }

  async update(user: User): Promise<void> {
    const raw = DrizzleUserMapper.toDrizzle(user)
    await db.update(users).set(raw).where(eq(users.id, user.id.toString()))
  }

  async delete(user: User): Promise<void> {
    await db.delete(users).where(eq(users.id, user.id.toString()))
  }
}
