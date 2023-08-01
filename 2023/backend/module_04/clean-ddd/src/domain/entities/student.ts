import random from 'node:crypto';

type StudentProps = {
  name: string
}

class Student {
  public id: string
  public name: string

  constructor(props: StudentProps, id?: string) {
    this.id = id ? id : random.randomUUID()
    this.name = props.name
  }
}

export { Student }