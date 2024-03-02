import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'

import { env } from '../env'
import { routes } from './routes'

const app = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restaurantId: t.Optional(t.String()),
      }),
    }),
  )
  .use(cookie)
  .use(routes)

app.listen(3333, () => {
  console.log('🚀 Listening on http://localhost:3333')
})
