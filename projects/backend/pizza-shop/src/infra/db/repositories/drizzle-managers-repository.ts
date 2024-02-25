import { eq } from 'drizzle-orm'

import { ManagersRepository } from '@/domain/store/application/repositories'
import { Manager } from '@/domain/store/enterprise/entities'

import { db } from '../connection'
import { DrizzleManagerMapper } from '../mappers'
import { users } from '../schema'

export class DrizzleManagersRepository implements ManagersRepository {
  async findById(id: string): Promise<Manager | null> {
    const manager = await db.query.users.findFirst({ where: eq(users.id, id) })
    if (!manager) return null
    return DrizzleManagerMapper.toDomain(manager)
  }

  async create(manager: Manager): Promise<void> {
    const raw = DrizzleManagerMapper.toDrizzle(manager)
    await db.insert(users).values(raw)
  }

  async delete(manager: Manager): Promise<void> {
    await db.delete(users).where(eq(users.id, manager.id.toString()))
  }
}
