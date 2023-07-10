import { Organization } from '@/modules/organization/entities'

interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Organization): Promise<void>
}

export { OrganizationsRepository }
