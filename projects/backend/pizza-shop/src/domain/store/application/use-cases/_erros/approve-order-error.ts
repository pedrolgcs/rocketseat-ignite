import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class ApproveOrderError extends Error implements UseCaseError {
  private readonly props: Props

  constructor() {
    super('You can only approve pending orders.')
    this.props = {
      friendlyMessage: 'Voce so pode aprovar pedidos pendentes',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
