import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

export type ManagerProps = {
  name: string
  email: string
  phone?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Manager extends Entity<ManagerProps> {
  static create(
    props: Optional<ManagerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Manager {
    const manager = new Manager(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return manager
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
