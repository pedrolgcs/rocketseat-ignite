import dayjs from 'dayjs'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-objects/slug'

export type QuestionProps = {
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
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ): Question {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get title(): string {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug(): Slug {
    return this.props.slug
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  get bastAnswerId(): UniqueEntityID | undefined {
    return this.props.bastAnswerId
  }

  set bastAnswerId(bastAnswerId: UniqueEntityID) {
    this.props.bastAnswerId = bastAnswerId
    this.touch()
  }

  get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }
}

export { Question }
