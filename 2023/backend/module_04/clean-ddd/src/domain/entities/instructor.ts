import { Entity } from '@/core/entities/entity'

type AnswerProps = {
  name: string
}

class Instructor extends Entity<AnswerProps> {
  constructor(props: AnswerProps, id?: string) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }
}

export { Instructor }
