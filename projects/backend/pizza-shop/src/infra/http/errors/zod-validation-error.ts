import { ZodError } from 'zod'

export class ZodValidationError extends Error {
  private readonly friendlyMessage =
    'Ocorreu um erro na validação dos dados, verifique e tente novamente'

  constructor(
    public message: string,
    private error: ZodError<Record<string, string>>,
  ) {
    super(message)
    this.error = error
  }

  get errors() {
    return this.error.formErrors.fieldErrors
  }

  get toResponse() {
    return {
      message: this.message,
      friendlyMessage: this.friendlyMessage,
      errors: this.errors,
    }
  }
}
