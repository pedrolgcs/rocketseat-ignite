import { eq } from 'drizzle-orm'

import { RestaurantsRepository } from '@/domain/store/application/repositories'
import { Restaurant } from '@/domain/store/enterprise/entities'

import { db } from '../connection'
import { DrizzleRestaurantMapper } from '../mappers'
import { restaurants } from '../schema'

export class DrizzleRestaurantsRepository implements RestaurantsRepository {
  async findById(id: string): Promise<Restaurant | null> {
    const restaurant = await db.query.restaurants.findFirst({
      where: eq(restaurants.id, id),
    })
    if (!restaurant) return null
    return DrizzleRestaurantMapper.toDomain(restaurant)
  }

  async findByManagerId(managerId: string): Promise<Restaurant | null> {
    const restaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.managerId, managerId)
      },
    })
    if (!restaurant) {
      return null
    }
    return DrizzleRestaurantMapper.toDomain(restaurant)
  }

  async create(restaurant: Restaurant): Promise<void> {
    const raw = DrizzleRestaurantMapper.toDrizzle(restaurant)
    await db.insert(restaurants).values(raw)
  }
}
