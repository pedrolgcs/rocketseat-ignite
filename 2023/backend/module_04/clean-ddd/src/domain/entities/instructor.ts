import random from 'node:crypto';

type AnswerProps = {
  name: string
}

class Instructor {
  public id: string
  public name: string

  constructor(props: AnswerProps, id?: string) {
    this.id = id ? id : random.randomUUID()
    this.name = props.name
  }
}

export { Instructor }