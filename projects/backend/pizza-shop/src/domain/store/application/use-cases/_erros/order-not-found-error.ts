import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class OrderNotFoundError extends Error implements UseCaseError {
  private readonly props: Props

  constructor() {
    super('Order not found')
    this.props = {
      friendlyMessage: 'Pedido não encontrado no sistema',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
