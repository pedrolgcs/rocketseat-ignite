import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'canceled'

export type OrderProps = {
  customerId: UniqueEntityID | null
  restaurantId: UniqueEntityID
  status: OrderStatus
  totalInCents: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends Entity<OrderProps> {
  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  get customerId() {
    return this.props.customerId
  }

  get restaurantId() {
    return this.props.restaurantId
  }

  get status() {
    return this.props.status
  }

  get totalInCents() {
    return this.props.totalInCents
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
