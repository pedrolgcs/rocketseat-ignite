import { Prisma, Ong } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { IOngRepository } from '../IOngRepository'

class PrismaOngRepository implements IOngRepository {
  async findById(id: string): Promise<Ong | null> {
    const ong = await prisma.ong.findUnique({
      where: {
        id,
      },
    })

    return ong
  }

  async findByEmail(email: string): Promise<Ong | null> {
    const ong = await prisma.ong.findUnique({
      where: {
        email,
      },
    })

    return ong
  }

  async create(data: Prisma.OngUncheckedCreateInput): Promise<Ong> {
    const ong = await prisma.ong.create({
      data,
    })

    return ong
  }
}

export { PrismaOngRepository }
