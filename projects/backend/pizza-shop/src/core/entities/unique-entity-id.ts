import { randomUUID } from 'node:crypto'

class UniqueEntityID {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  toString(): string {
    return this.value
  }

  toValue(): string {
    return this.value
  }

  equals(id: UniqueEntityID): boolean {
    return id.toString() === this.value
  }
}

export { UniqueEntityID }
