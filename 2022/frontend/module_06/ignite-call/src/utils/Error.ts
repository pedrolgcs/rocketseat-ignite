class AppError {
  public readonly friendlyMessage: string
  public readonly statusCode: number
  public readonly error: {
    [key: string]: string
  }

  constructor(
    friendlyMessage = 'Ops, ocorreu um erro inesperado!',
    statusCode = 400,
    error = {},
  ) {
    this.friendlyMessage = friendlyMessage
    this.statusCode = statusCode
    this.error = error
  }
}

export { AppError }
