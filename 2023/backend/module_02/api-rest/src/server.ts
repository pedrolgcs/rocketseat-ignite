import { env } from '@/env'
import { app } from './app'

// run instance
app
  .listen({ port: env.APP_PORT })
  .then(() => console.log(`Server running on localhost:${env.APP_PORT}`))
