import { User } from '@/application/modules/user/entities'

interface IUsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: User): Promise<void>
}

export { IUsersRepository }
