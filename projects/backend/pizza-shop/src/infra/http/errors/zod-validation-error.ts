import { ZodError } from 'zod'

type Props = {
  error: ZodError<Record<string, unknown>>
}

export class ZodValidationError extends Error {
  private props: Props

  constructor(props: Props) {
    super('Validation error')
    this.props = props
  }

  get error() {
    return this.props.error
  }

  get friendlyMessage() {
    return 'Desculpe, ocorreu um problema na validação dos dados. Por favor, verifique e tente novamente.'
  }

  toHTTP() {
    return {
      message: this.message,
      friendlyMessage: this.friendlyMessage,
      error: this.error.formErrors.fieldErrors,
    }
  }
}
