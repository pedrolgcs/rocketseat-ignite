import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type AnswerProps = {
  content: string
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

class Answer extends Entity<AnswerProps> {
  private constructor(props: AnswerProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Answer {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  get questionId(): UniqueEntityID {
    return this.props.questionId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }
}

export { Answer }
