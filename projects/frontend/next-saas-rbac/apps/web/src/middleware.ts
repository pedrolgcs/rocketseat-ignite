import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { authMiddleware, authRoutes } from './middlewares/auth-middleware'
import { organizationProjectMiddleware } from './middlewares/organization-project-middleware'
import {
  signInMiddleware,
  signInRoutes,
} from './middlewares/sign-in-middleware'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const { pathname } = request.nextUrl

  if (signInRoutes.test(pathname)) {
    return signInMiddleware(request)
  }

  if (authRoutes.test(pathname)) {
    return authMiddleware(request, response)
  }

  organizationProjectMiddleware(request, response)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
