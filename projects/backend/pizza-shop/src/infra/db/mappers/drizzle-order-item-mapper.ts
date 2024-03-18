import { InferSelectModel } from 'drizzle-orm'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderItem } from '@/domain/store/enterprise/entities'

import { orderItems, products } from '../schema'
import { DrizzleProductMapper } from './drizzle-product-mapper'

type DrizzleOrderItem = InferSelectModel<typeof orderItems> & {
  product?: InferSelectModel<typeof products> | null
}

export class DrizzleOrderItemMapper {
  static toDomain(raw: DrizzleOrderItem): OrderItem {
    return OrderItem.create(
      {
        orderId: new UniqueEntityID(raw.id),
        priceInCents: raw.priceInCents,
        productId: raw.productId ? new UniqueEntityID(raw.productId) : null,
        quantity: raw.quantity,
        product: raw.product
          ? DrizzleProductMapper.toDomain(raw.product)
          : undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toDrizzle(orderItem: OrderItem): DrizzleOrderItem {
    return {
      id: orderItem.id.toString(),
      orderId: orderItem.orderId.toString(),
      productId: orderItem.productId?.toString() || null,
      quantity: orderItem.quantity,
      priceInCents: orderItem.priceInCents,
    }
  }
}
