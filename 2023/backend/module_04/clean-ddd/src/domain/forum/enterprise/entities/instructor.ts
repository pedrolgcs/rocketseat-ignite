import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface InstructorProps {
  name: string
}

class Instructor extends Entity<InstructorProps> {
  private constructor(props: InstructorProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(props: InstructorProps, id?: UniqueEntityID): Instructor {
    const instructor = new Instructor(props, id)

    return instructor
  }

  get name(): string {
    return this.props.name
  }
}

export { Instructor }
