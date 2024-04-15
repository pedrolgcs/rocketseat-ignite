import { InferSelectModel } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/store/enterprise/entities'

import { products } from '../schema'

type DrizzleProduct = InferSelectModel<typeof products>

export class DrizzleProductMapper {
  static toDomain(raw: DrizzleProduct): Product {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        priceInCents: raw.priceInCents,
        restaurantId: new UniqueEntityID(raw.restaurantId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(product: Product): DrizzleProduct {
    return {
      id: product.id.toString(),
      name: product.name,
      description: product.description || null,
      priceInCents: product.priceInCents,
      restaurantId: product.restaurantId.toString(),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt || null,
    }
  }
}
