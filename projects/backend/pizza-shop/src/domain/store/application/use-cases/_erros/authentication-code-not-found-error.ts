import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class AuthenticationCodeNotFoundError
  extends Error
  implements UseCaseError
{
  private readonly props: Props

  constructor() {
    super('Authentication code not found')
    this.props = {
      friendlyMessage: 'Código de autenticação não encontrado',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
