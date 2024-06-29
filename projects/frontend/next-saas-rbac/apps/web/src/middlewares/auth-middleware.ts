import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const authRoutes = /^\//

export function authMiddleware(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get('@saas:token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return response
}
