import { Prisma, User } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash } = data

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user
  }
}

export { PrismaUsersRepository }
