import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/auth/sign-in'

  cookies().delete('@saas:token')
  cookies().delete('@saas:org')

  return NextResponse.redirect(redirectUrl)
}
