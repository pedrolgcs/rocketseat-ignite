import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'
import ky from 'ky'
import { redirect } from 'next/navigation'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookiesStore: CookiesFn | undefined

        // if in server replace cookies
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          cookiesStore = serverCookies
        }

        const token = getCookie('@saas:token', { cookies: cookiesStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      (request, options, response) => {
        if (response.status === 401) {
          redirect('/api/auth/sign-out')
        }
      },
    ],
  },
})
