import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

export async function makeAccount(overrides: Partial<User> = {}, id?: string) {
  const passwordHash = await hash(overrides.passwordHash ?? '123456', 3)

  const account = prisma.user.create({
    data: {
      id: id ?? undefined,
      name: overrides.name ?? faker.person.fullName(),
      email: overrides.email ?? faker.internet.email(),
      avatarUrl: overrides.avatarUrl ?? faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  return account
}
