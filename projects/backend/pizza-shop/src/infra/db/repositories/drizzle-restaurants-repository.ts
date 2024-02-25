import { eq } from 'drizzle-orm'

import { RestaurantesRepository } from '@/domain/store/application/repositories'
import { Restaurante } from '@/domain/store/enterprise/entities'

import { db } from '../connection'
import { DrizzleRestaurantMapper } from '../mappers'
import { restaurants } from '../schema'

export class DrizzleRestaurantsRepository implements RestaurantesRepository {
  async findById(id: string): Promise<Restaurante | null> {
    const restaurant = await db.query.restaurants.findFirst({
      where: eq(restaurants.id, id),
    })
    if (!restaurant) return null
    return DrizzleRestaurantMapper.toDomain(restaurant)
  }

  async create(restaurante: Restaurante): Promise<void> {
    const raw = DrizzleRestaurantMapper.toDrizzle(restaurante)
    await db.insert(restaurants).values(raw)
  }
}
