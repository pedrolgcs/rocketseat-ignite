import { HTTPError } from 'ky'
import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof HTTPError) {
      return e.message
    }

    return 'An unknown error occurred! Please, try again.'
  },
})
