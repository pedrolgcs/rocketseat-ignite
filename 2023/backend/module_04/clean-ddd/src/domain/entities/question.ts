import random from 'node:crypto'
import { Slug } from './value-objects/slug'

type QuestionProps = {
  title: string
  content: string
  slug: Slug
  authorId: string
}

class Question {
  public id: string
  public title: string
  public content: string
  public slug: Slug
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.id = id || random.randomUUID()
    this.title = props.title
    this.content = props.content
    this.slug = props.slug
    this.authorId = props.authorId
  }
}

export { Question }
