import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerProps {
  name: string
}

class Instructor extends Entity<AnswerProps> {
  private constructor(props: AnswerProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(props: AnswerProps, id?: UniqueEntityID): Instructor {
    const instructor = new Instructor(props, id)

    return instructor
  }

  get name(): string {
    return this.props.name
  }
}

export { Instructor }
