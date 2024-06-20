import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const signInRoutes = /^\/auth\//

export function signInMiddleware(request: NextRequest) {
  const token = request.cookies.get('@saas:token')?.value

  if (token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
