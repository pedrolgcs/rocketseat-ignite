import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class ManagerAlreadyExistsError extends Error implements UseCaseError {
  private readonly props: Props

  constructor() {
    super('Manager already exists')
    this.props = {
      friendlyMessage: 'Gerente já cadastrado no sistema',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
