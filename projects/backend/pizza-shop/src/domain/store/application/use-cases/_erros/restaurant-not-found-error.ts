import { UseCaseError } from '@/core/errors/use-case-error'

type Props = {
  friendlyMessage: string
}

export class RestaurantNotFoundError extends Error implements UseCaseError {
  private readonly props: Props

  constructor() {
    super('Restaurant not found')
    this.props = {
      friendlyMessage: 'Restaurant não encontrado no sistema',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }
}
