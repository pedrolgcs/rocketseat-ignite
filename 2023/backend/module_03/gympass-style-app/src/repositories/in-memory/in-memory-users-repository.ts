import crypto from 'node:crypto'
import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const { id, name, email, password_hash } = data

    const user = {
      id: id ?? crypto.randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}

export { InMemoryUsersRepository }
