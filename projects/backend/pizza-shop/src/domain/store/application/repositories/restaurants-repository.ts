import { Restaurant } from '@/domain/store/enterprise/entities'

export abstract class RestaurantsRepository {
  abstract findById(id: string): Promise<Restaurant | null>
  abstract findByManagerId(managerId: string): Promise<Restaurant | null>
  abstract create(restaurant: Restaurant): Promise<void>
}
