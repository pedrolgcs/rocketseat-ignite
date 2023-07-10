import { Organization } from '@/modules/organization/entities'
import { OrganizationsRepository } from '../organizations-repository'

class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(organization: Organization): Promise<void> {
    this.items.push(organization)
  }
}

export { InMemoryOrganizationsRepository }
