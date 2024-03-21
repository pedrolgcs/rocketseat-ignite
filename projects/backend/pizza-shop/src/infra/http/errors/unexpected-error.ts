import { Optional } from '@/core/types/optional'

type Props = {
  friendlyMessage: string
}

export class UnexpectedError extends Error {
  private props: Props

  constructor(props: Optional<Props, 'friendlyMessage'>) {
    super('Unexpected error')
    this.props = {
      friendlyMessage:
        props.friendlyMessage ??
        'Ocorreu um erro inesperado. Por favor, tente novamente.',
    }
  }

  get friendlyMessage() {
    return this.props.friendlyMessage
  }

  toHttp() {
    return {
      message: this.message,
      friendlyMessage: this.friendlyMessage,
    }
  }
}
