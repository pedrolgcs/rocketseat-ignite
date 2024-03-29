import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class ManagerNotFoundError extends Error implements UseCaseError {
  private readonly props: Props

  constructor() {
    super('Manager not found')
    this.props = {
      friendlyMessage: 'Gerente não encontrado no sistema',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
