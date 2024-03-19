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

  private touch() {
    this.props.updatedAt = new Date()
  }

  approve() {
    if (this.props.status !== 'pending') {
      throw new Error('Order status must be pending to approve')
    }
    this.props.status = 'processing'
    this.touch()
  }

  delivering() {
    if (this.props.status !== 'processing') {
      throw new Error('Order status must be processing to deliver')
    }
    this.props.status = 'delivering'
    this.touch()
  }

  deliver() {
    if (this.props.status !== 'delivering') {
      throw new Error('Order status must be delivering to deliver')
    }
    this.props.status = 'delivered'
    this.touch()
  }

  cancel() {
    if (this.props.status !== 'pending' && this.props.status !== 'processing') {
      throw new Error('Order status must be pending or processing to cancel')
    }
    this.props.status = 'canceled'
    this.touch()
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
