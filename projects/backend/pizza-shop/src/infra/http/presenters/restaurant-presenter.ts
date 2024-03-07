import { Restaurant } from '@/domain/store/enterprise/entities'

export class RestaurantPresenter {
  static toHTTP(restaurant: Restaurant) {
    return {
      id: restaurant.id.toString(),
      name: restaurant.name,
      description: restaurant.description,
      created_at: restaurant.createdAt,
    }
  }
}
