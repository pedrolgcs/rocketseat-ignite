import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'

export function buildNextAuthOptions(
  request: NextApiRequest | NextPageContext['req'],
  response: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(request, response),
    pages: {
      signIn: '/register/connect-calendar',
    },

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        profile: (profile: GoogleProfile) => {
          return {
            id: profile.sub,
            name: profile.email,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
            bio: null,
          }
        },
      }),
    ],

    callbacks: {
      async signIn({ account }) {
        const accountHasCalendarScope = account?.scope?.includes(
          'https://www.googleapis.com/auth/calendar',
        )

        if (accountHasCalendarScope) {
          return true
        }

        return '/register/connect-calendar/?error=OAuthPermissions'
      },
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  return await NextAuth(
    request,
    response,
    buildNextAuthOptions(request, response),
  )
}
