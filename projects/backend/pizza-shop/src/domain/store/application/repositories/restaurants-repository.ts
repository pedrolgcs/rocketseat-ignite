import { Restaurante } from '@/domain/store/enterprise/entities'

export abstract class RestaurantesRepository {
  abstract findById(id: string): Promise<Restaurante | null>
  abstract create(restaurante: Restaurante): Promise<void>
}
