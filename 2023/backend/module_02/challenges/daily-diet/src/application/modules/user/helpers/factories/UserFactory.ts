import { User } from '@/application/modules/user/entities'
import { UserBuilder } from '@/application/modules/user/helpers/builders'

type UserFields = {
  id?: string
  name: string
  email: string
  avatarUrl: string
}

class UserFactory {
  static default(): User {
    return new UserBuilder('user-id')
      .setName('name')
      .setEmail('user@gmail.com')
      .setAvatarUrl('avatar_url')
      .build()
  }

  static createUserFromFields({
    id,
    name,
    email,
    avatarUrl,
  }: UserFields): User {
    return new UserBuilder(id)
      .setName(name)
      .setEmail(email)
      .setAvatarUrl(avatarUrl)
      .build()
  }

  static createRandomUsers(count: number): User[] {
    const users = []

    for (let i = 0; i < count; i++) {
      users.push(
        new UserBuilder()
          .setName(`name ${i}`)
          .setEmail(`email ${i}`)
          .setAvatarUrl(`avatar ${i}`)
          .build(),
      )
    }

    return users
  }
}

export { UserFactory }
