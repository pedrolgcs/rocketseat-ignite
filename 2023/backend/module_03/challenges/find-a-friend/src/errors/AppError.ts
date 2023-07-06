type AppErrorParams = {
  message: string
  friendlyMessage: string
  statusCode?: number
  issues?: Record<string, unknown> | null
}

class AppError {
  public readonly message: string

  public readonly friendlyMessage: string

  public readonly statusCode: number

  public readonly formError: unknown

  public readonly issues: Record<string, unknown> | null

  constructor({
    message,
    friendlyMessage,
    statusCode = 400,
    issues = null,
  }: AppErrorParams) {
    this.message = message
    this.friendlyMessage = friendlyMessage
    this.statusCode = statusCode
    this.issues = issues
  }
}

export { AppError }
