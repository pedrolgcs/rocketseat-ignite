import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type OrderItemProps = {
  orderId: UniqueEntityID
  productId: UniqueEntityID | null
  priceInCents: number
  quantity: number
}

export class OrderItem extends Entity<OrderItemProps> {
  static create(props: OrderItemProps, id?: UniqueEntityID) {
    return new OrderItem(props, id)
  }

  get orderId() {
    return this.props.orderId
  }

  get productId() {
    return this.props.productId
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  get quantity() {
    return this.props.quantity
  }
}
