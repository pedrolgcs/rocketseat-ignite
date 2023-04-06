import { AxiosError } from 'axios'
import { AxiosErrorData } from '@/lib/axios'

class AppError {
  public readonly friendlyMessage: string
  public readonly statusCode: number
  public readonly error: AxiosError<AxiosErrorData>

  constructor(
    friendlyMessage = 'Ops, ocorreu um erro inesperado!',
    statusCode = 400,
    error: AxiosError<AxiosErrorData>,
  ) {
    this.friendlyMessage = friendlyMessage
    this.statusCode = statusCode
    this.error = error
  }
}

export { AppError }
