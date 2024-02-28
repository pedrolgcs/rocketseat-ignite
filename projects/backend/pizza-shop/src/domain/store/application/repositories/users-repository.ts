import { User } from '@/domain/store/enterprise/entities'

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<void>
  abstract update(user: User): Promise<void>
}
