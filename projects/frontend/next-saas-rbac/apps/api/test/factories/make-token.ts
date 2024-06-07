import { Token } from '@prisma/client'

import { prisma } from '@/lib/prisma'

type MakeTokenParams = Omit<Token, 'id' | 'createdAt'>

export async function makeToken(data: MakeTokenParams) {
  const token = await prisma.token.create({
    data: {
      type: data.type,
      userId: data.userId,
    },
  })

  return token
}
