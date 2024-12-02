import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { env } from '@saas/env'

import { removeOldTokensJob } from '@/jobs/remove-old-tokens'

import { app } from './app'

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  removeOldTokensJob.start()

  const spec = app.swagger()

  writeFile(
    resolve(__dirname, '..', '..', 'swagger.json'),
    JSON.stringify(spec, null, 2),
    'utf-8',
  )

  console.log('🚀 HTTP Server running on http://localhost:3333')
})
