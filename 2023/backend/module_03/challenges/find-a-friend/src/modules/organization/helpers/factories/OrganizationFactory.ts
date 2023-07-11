import { Organization } from '@/modules/organization/entities'
import { OrganizationBuilder } from '@/modules/organization/helpers/builders'

type OrganizationFields = {
  id?: string
  name: string
  email: string
  cep: string
  state: string
  city: string
  address: string
  latitude: number
  longitude: number
  phone: string
  passwordHash: string
  createdAt?: Date
}

class OrganizationFactory {
  static default(): Organization {
    return new OrganizationBuilder().build()
  }

  static createOrganizationFromFields({
    id,
    name,
    email,
    cep,
    state,
    city,
    address,
    latitude,
    longitude,
    phone,
    passwordHash,
  }: OrganizationFields): Organization {
    return new OrganizationBuilder(id)
      .setName(name)
      .setEmail(email)
      .setPasswordHash(passwordHash)
      .setAddress(address)
      .setCep(cep)
      .setLatitude(latitude)
      .setLongitude(longitude)
      .setPhone(phone)
      .setCity(city)
      .setState(state)
      .setCreatedAt(new Date())
      .build()
  }

  static createRandomOrganization(count: number): Organization[] {
    const organizations = []

    for (let index = 0; index < count; index++) {
      organizations.push(
        new OrganizationBuilder(index.toString())
          .setName(`name ${index}`)
          .setEmail(`email ${index}`)
          .setPhone(`phone ${index}`)
          .setPasswordHash(`password ${index}`)
          .setAddress(`address ${index}`)
          .setCep(`cep ${index}`)
          .setLatitude(1)
          .setLongitude(1)
          .setCity(`city ${index}`)
          .setState(`state ${index}`)
          .setCreatedAt(new Date())
          .build(),
      )
    }

    return organizations
  }
}

export { OrganizationFactory }
