import crypto from 'node:crypto'
import { Ong, Prisma } from '@prisma/client'
import { IOngRepository } from '../IOngRepository'

class InMemoryOngRepository implements IOngRepository {
  public items: Ong[] = []

  async findById(id: string): Promise<Ong | null> {
    const ong = this.items.find((item) => item.id === id)

    if (!ong) {
      return null
    }

    return ong
  }

  async findByEmail(email: string): Promise<Ong | null> {
    const ong = this.items.find((item) => item.email === email)

    if (!ong) {
      return null
    }

    return ong
  }

  async create(data: Prisma.OngUncheckedCreateInput): Promise<Ong> {
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

export { InMemoryOngRepository }
