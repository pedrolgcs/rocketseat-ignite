type AppErrorParams = {
  message: string
  friendlyMessage: string
  statusCode?: number
  formError: unknown
}

class AppError {
  public readonly message: string

  public readonly friendlyMessage: string

  public readonly statusCode: number

  public readonly formError: unknown

  constructor({
    message,
    friendlyMessage,
    formError,
    statusCode = 400,
  }: AppErrorParams) {
    this.message = message
    this.friendlyMessage = friendlyMessage
    this.formError = formError
    this.statusCode = statusCode
  }
}

export { AppError }
