import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: UniqueEntityID
  bastAnswerId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

class Question extends Entity<QuestionProps> {
  private constructor(props: QuestionProps, id?: UniqueEntityID) {
    super(props, id)
  }

  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Question {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return question
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get slug(): Slug {
    return this.props.slug
  }

  get bastAnswerId(): UniqueEntityID | undefined {
    return this.props.bastAnswerId
  }

  get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }
}

export { Question }
