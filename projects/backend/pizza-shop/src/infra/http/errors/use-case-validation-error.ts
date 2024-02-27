type Props = {
  message: string
  friendlyMessage: string
}

export class UseCaseValidationError extends Error {
  private props: Props

  constructor(props: Props) {
    super(props.message)
    this.props = props
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
