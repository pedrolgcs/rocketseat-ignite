import { NextRequest, NextResponse } from 'next/server'

/**
 * Example of middleware implementation
 */
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/users/:path*'],
}
