import { Elysia } from 'elysia'

import { auth } from '../../plugins'

export const healthCheckRouter = new Elysia()
  .use(auth)
  .get('/health', ({ cookie }) => {
    console.log(cookie)

    return 'Healthy Check'
  })
