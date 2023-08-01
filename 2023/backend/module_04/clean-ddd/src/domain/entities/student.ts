import { Entity } from '@/core/entities/entity'

type StudentProps = {
  name: string
}

class Student extends Entity<StudentProps> {
  constructor(props: StudentProps, id?: string) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }
}

export { Student }
