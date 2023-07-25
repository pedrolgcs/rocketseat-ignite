import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { Organization } from '@/modules/organization/entities'

class OrganizationBuilder {
  private organization: Organization

  constructor(id: string = crypto.randomUUID()) {
    this.organization = Organization.create(
      {
        name: 'name',
        email: 'organization@gmail.com',
        phone: 'phone',
        passwordHash: bcrypt.hashSync('password', 6),
        address: 'address',
        cep: 'cep',
        city: 'city',
        state: 'state',
        latitude: 1,
        longitude: 1,
      },
      id,
    )
  }

  public setName(name: string): this {
    this.organization.name = name
    return this
  }

  public setEmail(email: string): this {
    this.organization.email = email
    return this
  }

  public setPhone(phone: string): this {
    this.organization.phone = phone
    return this
  }

  public setPasswordHash(passwordHash: string): this {
    this.organization.passwordHash = bcrypt.hashSync(passwordHash, 6)
    return this
  }

  public setAddress(address: string): this {
    this.organization.address = address
    return this
  }

  public setCep(cep: string): this {
    this.organization.cep = cep
    return this
  }

  public setCity(city: string): this {
    this.organization.city = city
    return this
  }

  public setState(state: string): this {
    this.organization.state = state
    return this
  }

  public setLatitude(latitude: number): this {
    this.organization.latitude = latitude
    return this
  }

  public setLongitude(longitude: number): this {
    this.organization.longitude = longitude
    return this
  }

  public setCreatedAt(createdAt: Date): this {
    this.organization.createdAt = createdAt
    return this
  }

  public build(): Organization {
    return this.organization
  }
}

export { OrganizationBuilder }
