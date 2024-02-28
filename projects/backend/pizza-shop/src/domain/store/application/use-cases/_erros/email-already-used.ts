import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class EmailAlreadyUsedError extends Error implements UseCaseError {
  private readonly props: Props

  constructor() {
    super('Email already used')
    this.props = {
      friendlyMessage: 'Email já utilizado',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
