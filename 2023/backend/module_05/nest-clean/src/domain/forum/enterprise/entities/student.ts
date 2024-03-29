import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface StudentProps {
  name: string
  email: string
  password: string
}

class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID): Student {
    const student = new Student(props, id)

    return student
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }
}

export { Student }
