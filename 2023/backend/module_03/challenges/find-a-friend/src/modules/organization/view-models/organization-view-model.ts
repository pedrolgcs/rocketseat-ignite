import { Organization } from '@/modules/organization/entities'

class OrganizationViewModel {
  static toHTTP(organization: Organization) {
    return {
      id: organization.id,
      name: organization.name,
      email: organization.email,
      cep: organization.cep,
      state: organization.state,
      city: organization.city,
      address: organization.address,
      phone: organization.phone,
      latitude: organization.latitude,
      longitude: organization.longitude,
      createdAt: organization.createdAt,
    }
  }
}

export { OrganizationViewModel }
