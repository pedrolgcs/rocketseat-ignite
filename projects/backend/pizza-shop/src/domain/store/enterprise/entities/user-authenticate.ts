import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type UserAuthenticateProps = {
  code: string
  userId: UniqueEntityID
  createdAt: Date
}

export class UserAuthenticate extends Entity<UserAuthenticateProps> {
  static create(
    props: Optional<UserAuthenticateProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    return new UserAuthenticate(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  public createURL(baseURl: string, redirect: string) {
    const TO_URL = '/auth-links/authenticate'
    const url = new URL(TO_URL, baseURl)
    url.searchParams.set('code', this.code)
    url.searchParams.set('redirect', redirect)
    return url.toString()
  }

  get code() {
    return this.props.code
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }
}
