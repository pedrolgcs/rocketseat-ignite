import { InferSelectModel } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Manager } from '@/domain/store/enterprise/entities'

import { users } from '../schema'

type DrizzleManager = InferSelectModel<typeof users>

export class DrizzleManagerMapper {
  static toDomain(raw: DrizzleManager): Manager {
    return Manager.create(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(manager: Manager): DrizzleManager {
    return {
      id: manager.id.toString(),
      name: manager.name,
      email: manager.email,
      phone: manager.phone ?? null,
      role: 'manager',
      created_at: manager.createdAt,
      updated_at: manager.updatedAt ?? null,
    }
  }
}
