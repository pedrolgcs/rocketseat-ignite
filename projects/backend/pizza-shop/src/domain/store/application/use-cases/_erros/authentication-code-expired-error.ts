import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class AuthenticationCodeExpiredError
  extends Error
  implements UseCaseError
{
  private readonly props: Props

  constructor() {
    super('Authentication code expired')
    this.props = {
      friendlyMessage: 'Código de autenticação expirado',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
