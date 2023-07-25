import { Organization as PrismaOrganization, Prisma } from '@prisma/client'
import { Organization } from '@/modules/organization/entities'

class PrismaOrganizationMapper {
  static toPrisma(organization: Organization): PrismaOrganization {
    return {
      id: organization.id,
      name: organization.name,
      email: organization.email,
      password_hash: organization.passwordHash,
      cep: organization.cep,
      state: organization.state,
      city: organization.city,
      address: organization.address,
      phone: organization.phone,
      latitude: new Prisma.Decimal(organization.latitude),
      longitude: new Prisma.Decimal(organization.longitude),
      created_at: organization.createdAt,
    }
  }

  static toDomain(organization: PrismaOrganization): Organization {
    return Organization.create(
      {
        name: organization.name,
        email: organization.email,
        passwordHash: organization.password_hash,
        cep: organization.cep,
        state: organization.state,
        city: organization.city,
        address: organization.address,
        phone: organization.phone,
        latitude: Number(organization.latitude),
        longitude: Number(organization.longitude),
        createdAt: organization.created_at,
      },
      organization.id,
    )
  }
}

export { PrismaOrganizationMapper }
