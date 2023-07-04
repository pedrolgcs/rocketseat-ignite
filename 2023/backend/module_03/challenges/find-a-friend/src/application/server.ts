import { env } from '@/application/env'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.APP_PORT,
  })
  .then(() => console.log(`🚀 HTTP Server Running on port ${env.APP_PORT}`))
