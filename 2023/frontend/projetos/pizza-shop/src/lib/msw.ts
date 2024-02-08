import { setupWorker } from 'msw/browser'

import { env } from '@/env'
import { accountMenuHttpMocks } from '@/features/account-menu'
import { analyticHttpMocks } from '@/features/analytics'
import { authenticationHttpMocks } from '@/features/authentication'
import { ordersTableHttpMocks } from '@/features/orders-table'

export const worker = setupWorker(
  ...authenticationHttpMocks,
  ...analyticHttpMocks,
  ...accountMenuHttpMocks,
  ...ordersTableHttpMocks,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
