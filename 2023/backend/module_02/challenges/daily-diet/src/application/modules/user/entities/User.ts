import { Entity } from '@/core/domain'

type UserProps = {
  name: string
  email: string
  avatarUrl: string
  createdAt?: Date
}

class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  public static create(props: UserProps, id?: string) {
    return new User(
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

  get email() {
    return this.props.email
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get createdAt() {
    return this.props.createdAt
  }
}

export { User }
