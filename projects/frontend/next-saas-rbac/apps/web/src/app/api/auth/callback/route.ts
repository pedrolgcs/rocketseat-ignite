import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { signInWithGithub } from '@/modules/users/authenticate'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      {
        message: 'Github OAuth code was not found!',
      },
      { status: 400 },
    )
  }

  try {
    const { token } = await signInWithGithub({ code })

    cookies().set('@saas:token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'
    redirectUrl.search = ''

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json<{ message: string }>()

      return NextResponse.json({ message }, { status: error.response.status })
    }

    return NextResponse.json({ error }, { status: 500 })
  }
}
