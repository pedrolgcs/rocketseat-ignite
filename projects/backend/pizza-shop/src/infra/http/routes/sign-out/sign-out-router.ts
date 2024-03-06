import { Elysia } from 'elysia'

import { auth } from '@/infra/http/plugins'

export const signOutRouter = new Elysia()
  .use(auth)
  .post('/sign-out', async ({ signOut }) => {
    signOut()
  })
