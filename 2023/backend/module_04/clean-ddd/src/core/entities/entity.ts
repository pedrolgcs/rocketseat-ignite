import { UniqueEntityID } from './unique-entity-id'

class Entity<T> {
  private _id: UniqueEntityID
  protected props: T

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  get id(): string {
    return this._id.toValue()
  }
}

export { Entity }
