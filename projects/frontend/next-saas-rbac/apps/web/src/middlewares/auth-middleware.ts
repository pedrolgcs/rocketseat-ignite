import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('@saas:token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}
