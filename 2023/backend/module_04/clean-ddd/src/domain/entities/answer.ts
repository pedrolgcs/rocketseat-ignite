import random from 'node:crypto'

type AnswerProps = {
  content: string
  authorId: string
  questionId: string
}

class Answer {
  public id: string
  public content: string
  public authorId: string
  public questionId: string

  constructor(props: AnswerProps, id?: string) {
    this.id = id ? id : random.randomUUID()
    this.content = props.content
    this.authorId = props.authorId
    this.questionId = props.questionId
  }
}

export { Answer }