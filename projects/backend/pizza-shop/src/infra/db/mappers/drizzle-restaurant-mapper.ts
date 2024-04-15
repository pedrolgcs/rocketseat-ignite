import { InferSelectModel } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Restaurant } from '@/domain/store/enterprise/entities'

import { restaurants } from '../schema'

type DrizzleRestaurant = InferSelectModel<typeof restaurants>

export class DrizzleRestaurantMapper {
  static toDomain(raw: DrizzleRestaurant): Restaurant {
    return Restaurant.create(
      {
        name: raw.name,
        description: raw.description,
        managerId: raw.managerId ? new UniqueEntityID(raw.managerId) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(restaurant: Restaurant): DrizzleRestaurant {
    return {
      id: restaurant.id.toString(),
      name: restaurant.name,
      description: restaurant.description || null,
      managerId: restaurant.managerId ? restaurant.managerId.toString() : null,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt || null,
    }
  }
}
