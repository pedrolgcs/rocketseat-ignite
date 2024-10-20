import { env } from '@saas/env'

import { removeOldTokensJob } from '@/jobs/remove-old-tokens'

import { app } from './app'

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  removeOldTokensJob.start()

  console.log('🚀 HTTP Server running on http://localhost:3333')
})
