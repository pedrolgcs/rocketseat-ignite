import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const organizationProjectRoutes = /^\/org\//

export function organizationProjectMiddleware(
  request: NextRequest,
  response: NextResponse,
) {
  const { pathname } = request.nextUrl

  if (organizationProjectRoutes.test(pathname)) {
    const [, , slug] = pathname.split('/')

    response.cookies.set('@saas:org', slug)
  } else {
    response.cookies.delete('@saas:org')
  }

  return response
}
