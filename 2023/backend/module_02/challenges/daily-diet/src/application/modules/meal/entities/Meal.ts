import { Entity } from '@/core/domain'

type MealProps = {
  name: string
  description: string | null
  eatTime: Date
  isDiet: boolean
  userId: string
  createdAt?: Date
}

class Meal extends Entity<MealProps> {
  private constructor(props: MealProps, id?: string) {
    super(props, id)
  }

  public static create(props: MealProps, id?: string) {
    return new Meal(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string | null) {
    this.props.description = description
  }

  get eatTime() {
    return this.props.eatTime
  }

  set eatTime(eatTime: Date) {
    this.props.eatTime = eatTime
  }

  get isDiet() {
    return this.props.isDiet
  }

  set isDiet(isDiet: boolean) {
    this.props.isDiet = isDiet
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }
}

export { Meal }
