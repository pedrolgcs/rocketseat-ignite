import { AxiosError } from 'axios'

class AppError {
  public readonly friendlyMessage: string
  public readonly statusCode: number
  public readonly error: AxiosError

  constructor(
    friendlyMessage = 'Ops, ocorreu um erro inesperado!',
    statusCode = 400,
    error: AxiosError,
  ) {
    this.friendlyMessage = friendlyMessage
    this.statusCode = statusCode
    this.error = error
  }
}

export { AppError }
