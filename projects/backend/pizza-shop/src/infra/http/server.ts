import { Elysia } from 'elysia'

import { routes } from './routes'

const app = new Elysia()

app.use(routes)

app.listen(3333, () => {
  console.log('🚀 Listening on http://localhost:3333')
})
