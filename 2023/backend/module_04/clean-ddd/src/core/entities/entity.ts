import { UniqueEntityID } from './unique-entity-id'

class Entity<T> {
  private _id: UniqueEntityID
  protected props: T

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  get id(): UniqueEntityID {
    return this._id
  }

  public equals(entity: Entity<T>): boolean {
    if (entity === this) {
      return true
    }

    if (entity.id.equals(this.id)) {
      return true
    }

    return false
  }
}

export { Entity }
