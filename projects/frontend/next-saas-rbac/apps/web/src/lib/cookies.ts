import { getCookie as getCookieNext } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'

export const getCookie = async (key: string) => {
  let cookiesStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')
    cookiesStore = serverCookies
  }

  return getCookieNext(key, { cookies: cookiesStore })
}
