import crypto from 'node:crypto'
import { User } from '@/application/modules/user/entities'

class UserBuilder {
  private user: User

  constructor(id: string = crypto.randomUUID()) {
    this.user = User.create(
      {
        name: 'user-name',
        email: 'user@mail.com',
        avatarUrl: 'https://avatars.githubusercontent.com/u/11464809?v=4',
      },
      id,
    )
  }

  public setName(name: string): this {
    this.user.props.name = name
    return this
  }

  public setEmail(email: string): this {
    this.user.props.email = email
    return this
  }

  public setAvatarUrl(avatarUrl: string): this {
    this.user.props.avatarUrl = avatarUrl
    return this
  }

  public build(): User {
    return this.user
  }
}

export { UserBuilder }
