import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type RestaurantProps = {
  name: string
  description?: string | null
  managerId: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Restaurant extends Entity<RestaurantProps> {
  static create(
    props: Optional<RestaurantProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new Restaurant(
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

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get managerId() {
    return this.props.managerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
