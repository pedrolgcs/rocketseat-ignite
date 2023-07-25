import { prisma } from '@/lib/prisma'
import { Organization } from '@/modules/organization/entities'
import { PrismaOrganizationMapper } from '@/modules/organization/mappers'
import { OrganizationsRepository } from '../organizations-repository'

class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    if (!organization) {
      return null
    }

    const organizationToDomain = PrismaOrganizationMapper.toDomain(organization)

    return organizationToDomain
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    if (!organization) {
      return null
    }

    const organizationToDomain = PrismaOrganizationMapper.toDomain(organization)

    return organizationToDomain
  }

  async create(data: Organization): Promise<void> {
    const organizationToPrisma = PrismaOrganizationMapper.toPrisma(data)

    await prisma.organization.create({
      data: organizationToPrisma,
    })
  }
}

export { PrismaOrganizationsRepository }
