import { Entity } from '@/core/entities/entity'

type AnswerProps = {
  content: string
  authorId: string
  questionId: string
}

class Answer extends Entity<AnswerProps> {
  constructor(props: AnswerProps, id?: string) {
    super(props, id)
  }

  get content(): string {
    return this.props.content
  }

  get authorId(): string {
    return this.props.authorId
  }

  get questionId(): string {
    return this.props.questionId
  }
}

export { Answer }
