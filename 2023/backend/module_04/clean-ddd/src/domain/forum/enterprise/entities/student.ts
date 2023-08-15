import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface StudentProps {
  name: string
}

class Student extends Entity<StudentProps> {
  private constructor(props: StudentProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(props: StudentProps, id?: UniqueEntityID): Student {
    const student = new Student(props, id)

    return student
  }

  get name() {
    return this.props.name
  }
}

export { Student }
