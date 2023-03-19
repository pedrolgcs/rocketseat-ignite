import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter } from 'next-auth/adapters'
import { parseCookies, destroyCookie } from 'nookies'
import { prisma } from '@/lib/prisma'

export function PrismaAdapter(
  request: NextApiRequest | NextPageContext['req'],
  response: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({
        req: request,
      })

      const userExistsInDatabase = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      })

      if (!userIdOnCookies && !userExistsInDatabase) {
        throw new Error('User not found!')
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userIdOnCookies || userExistsInDatabase?.id,
        },
        data: {
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res: response }, '@ignitecall:userId', {
        path: '/',
      })

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email!,
        username: updatedUser.username,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
        bio: updatedUser.bio,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        avatar_url: user.avatar_url!,
        emailVerified: null,
        bio: user.bio,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        avatar_url: user.avatar_url!,
        emailVerified: null,
        bio: user.bio,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        username: user.username,
        avatar_url: user.avatar_url!,
        emailVerified: null,
        bio: user.bio,
      }
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email!,
        username: updatedUser.username,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
        bio: updatedUser.bio,
      }
    },

    // async deleteUser(userId) {},

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    // async unlinkAccount({ providerAccountId, provider }) {},

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        userId,
        sessionToken,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          username: user.username,
          avatar_url: user.avatar_url!,
          emailVerified: null,
          bio: user.bio,
        },
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaUpdated = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          user_id: userId,
          expires,
        },
      })

      return {
        sessionToken: prismaUpdated.session_token,
        expires: prismaUpdated.expires,
        userId: prismaUpdated.user_id,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },

    // async createVerificationToken({ identifier, expires, token }) {},

    // async useVerificationToken({ identifier, token }) {},
  }
}
