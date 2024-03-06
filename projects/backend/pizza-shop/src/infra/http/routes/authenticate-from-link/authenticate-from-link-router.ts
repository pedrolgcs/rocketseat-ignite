import { Elysia } from 'elysia'
import { z } from 'zod'

import {
  makeAuthenticateFromCodeUseCase,
  makeDeleteAuthenticateLinkByCodeUseCase,
} from '@/infra/factories/use-cases'
import { ZodValidationError } from '@/infra/http/errors'
import { auth } from '@/infra/http/plugins'

const querySchema = z.object({
  code: z.string(),
  redirect: z.string(),
})

export const authenticateFromLinkRouter = new Elysia()
  .use(auth)
  .get('/auth-links/authenticate', async ({ query, set, signUser }) => {
    const parseQuery = querySchema.safeParse(query)

    if (!parseQuery.success) {
      throw new ZodValidationError({ error: parseQuery.error })
    }

    const { code, redirect } = parseQuery.data

    const authenticateFromCode = makeAuthenticateFromCodeUseCase()

    const authenticationFromCodeResult = await authenticateFromCode.execute({
      code,
    })

    if (authenticationFromCodeResult.isLeft()) {
      const redirectURL = new URL(redirect)
      redirectURL.searchParams.set(
        'error',
        authenticationFromCodeResult.value.message,
      )

      return (set.redirect = redirectURL.toString())
    }

    const { userId, restaurantIds } = authenticationFromCodeResult.value

    await signUser({
      sub: userId,
      restaurantIds,
    })

    const deleteAuthenticateLinkByCode =
      makeDeleteAuthenticateLinkByCodeUseCase()

    await deleteAuthenticateLinkByCode.execute({ code })

    // set.redirect = redirect
  })
