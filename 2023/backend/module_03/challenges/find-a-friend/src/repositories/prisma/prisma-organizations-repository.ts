import { Prisma, Organization } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { IOrganizationsRepository } from '../IOrganizationsRepository'

class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async findById(id: string): Promise<Organization | null> {
    const ong = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return ong
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const ong = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return ong
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const ong = await prisma.organization.create({
      data,
    })

    return ong
  }
}

export { PrismaOrganizationsRepository }
