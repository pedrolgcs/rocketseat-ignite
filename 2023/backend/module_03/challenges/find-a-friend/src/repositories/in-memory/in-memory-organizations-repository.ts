import crypto from 'node:crypto'
import { Organization, Prisma } from '@prisma/client'
import { IOrganizationsRepository } from '../IOrganizationsRepository'

class InMemoryOrganizationsRepository implements IOrganizationsRepository {
  public items: Organization[] = []

  async findById(id: string): Promise<Organization | null> {
    const ong = this.items.find((item) => item.id === id)

    if (!ong) {
      return null
    }

    return ong
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const ong = this.items.find((item) => item.email === email)

    if (!ong) {
      return null
    }

    return ong
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const ong = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      password_hash: data.password_hash,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(ong)

    return ong
  }
}

export { InMemoryOrganizationsRepository }
