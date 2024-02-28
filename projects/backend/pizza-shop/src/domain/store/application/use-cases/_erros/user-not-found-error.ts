import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class UserNotFoundError extends Error implements UseCaseError {
  private readonly props: Props

  constructor() {
    super('User not found')
    this.props = {
      friendlyMessage: 'Usuário não encontrado',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
