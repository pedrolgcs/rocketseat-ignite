/* eslint-disable no-use-before-define */
import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { Elysia, type Static, t } from 'elysia'

import { env } from '@/infra/env'

import { UnauthorizedError } from '../errors'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantIds: t.Array(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayload,
    }),
  )
  .use(cookie())
  .derive(({ jwt, setCookie, removeCookie, cookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        setCookie('auth', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },

      signOut: () => {
        removeCookie('auth')
      },

      getCurrentUser: async () => {
        const authCookie = cookie.auth

        const payload = await jwt.verify(authCookie)

        if (!payload) {
          throw new UnauthorizedError({
            friendlyMessage: 'Por favor, realize o login.',
          })
        }

        return {
          userId: payload.sub,
          restaurantIds: payload.restaurantIds,
        }
      },
    }
  })
