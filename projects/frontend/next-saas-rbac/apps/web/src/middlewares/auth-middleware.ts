import type { NextRequest } from 'next/server'

export const authRoutes = /^\//

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('@saas:token')?.value ?? null
  return token
}
