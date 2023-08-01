import { Entity } from '@/core/entities/entity'
import { Slug } from './value-objects/slug'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: string
}

class Question extends Entity<QuestionProps> {
  constructor(props: QuestionProps, id?: string) {
    super(props, id)
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }
}

export { Question }
