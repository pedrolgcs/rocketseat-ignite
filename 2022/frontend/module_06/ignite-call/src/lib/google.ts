import dayjs from 'dayjs'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'

export async function getGoogleOAuthToken(
  userId: string,
): Promise<OAuth2Client> {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      user_id: userId,
    },
  })

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  })

  if (!account.expires_at) {
    return auth
  }

  const isTokenExpired = dayjs(account.expires_at * 1000).isBefore(new Date())

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()

    const { access_token, expiry_date, id_token, refresh_token, token_type } =
      credentials

    const expires_at = expiry_date ? Math.floor(expiry_date / 1000) : null

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        expires_at,
        id_token,
        refresh_token,
        token_type,
      },
    })

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    })
  }

  return auth
}
