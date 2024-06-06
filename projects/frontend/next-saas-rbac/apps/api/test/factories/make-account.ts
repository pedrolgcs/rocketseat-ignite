import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

type Overrides = Partial<Omit<User, 'passwordHash'> & { password?: string }>

export async function makeAccount(overrides: Overrides = {}, id?: string) {
  const passwordHash = await hash(overrides.password ?? '123456', 3)

  const account = await prisma.user.create({
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
