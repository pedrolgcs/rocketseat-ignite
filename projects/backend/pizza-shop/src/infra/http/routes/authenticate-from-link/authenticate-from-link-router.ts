import { Elysia } from 'elysia'
import { z } from 'zod'

import {
  makeAuthenticateFromCodeUseCase,
  makeDeleteAuthenticateLinkByCodeUseCase,
} from '@/infra/factories/use-cases'
import { UseCaseValidationError, ZodValidationError } from '@/infra/http/errors'
import { auth } from '@/infra/http/plugins'

const querySchema = z.object({
  code: z.string(),
  redirect: z.string(),
})

export const authenticateFromLinkRouter = new Elysia()
  .use(auth)
  .get('/auth-links/authenticate', async ({ query, set, jwt, setCookie }) => {
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
      throw new UseCaseValidationError({
        message: authenticationFromCodeResult.value.message,
        friendlyMessage: authenticationFromCodeResult.value.friendlyMessage,
      })
    }

    const { userId, restaurantIds } = authenticationFromCodeResult.value

    const token = await jwt.sign({
      sub: userId,
      restaurantIds,
    })

    setCookie('auth', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    const deleteAuthenticateLinkByCode =
      makeDeleteAuthenticateLinkByCodeUseCase()

    await deleteAuthenticateLinkByCode.execute({ code })

    set.redirect = redirect
  })
