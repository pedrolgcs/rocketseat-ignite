import { OrderItem } from '@/domain/store/enterprise/entities'

import { ProductPresenter } from './product-presenter'

export class OrderItemPresenter {
  static toHTTP(orderItem: OrderItem) {
    return {
      id: orderItem.id.toString(),
      priceInCents: orderItem.priceInCents,
      quantity: orderItem.quantity,
      product: orderItem.product
        ? ProductPresenter.toHTTP(orderItem.product)
        : undefined,
    }
  }
}
