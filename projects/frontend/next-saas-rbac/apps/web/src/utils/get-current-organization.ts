import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'

export async function getCurrentOrganization() {
  let cookiesStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')
    cookiesStore = serverCookies
  }

  return getCookie('@saas:org', { cookies: cookiesStore })
}
