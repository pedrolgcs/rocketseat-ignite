type Props = {
  friendlyMessage: string
}

export class UnauthorizedError extends Error {
  private props: Props

  constructor(props: Props) {
    super('Unauthorized')
    this.props = {
      friendlyMessage: props.friendlyMessage ?? 'Por favor, realize o login.',
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
