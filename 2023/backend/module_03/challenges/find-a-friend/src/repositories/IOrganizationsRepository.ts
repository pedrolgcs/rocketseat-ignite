import { Organization, Prisma } from '@prisma/client'

interface IOrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
}

export { IOrganizationsRepository }
