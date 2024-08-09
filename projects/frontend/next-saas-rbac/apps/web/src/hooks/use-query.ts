import { HTTPError } from 'ky'

type Success<T> = {
  data: T
  isError: false
  error: null
}

type Error = {
  data: null
  isError: true
  error: string
}

type Params<T> = {
  httpRequest: (...args: unknown[]) => Promise<T>
}

type Response<T> = Success<T> | Error

export async function useServerQuery<T>(
  params: Params<T>,
): Promise<Response<T>> {
  const { httpRequest } = params

  try {
    const result = await httpRequest()

    return {
      data: result,
      error: null,
      isError: false,
    }
  } catch (error) {
    const message =
      error instanceof Error || error instanceof HTTPError
        ? error.message
        : 'Something went wrong. Please, try again later.'

    return {
      data: null,
      error: message,
      isError: true,
    }
  }
}
