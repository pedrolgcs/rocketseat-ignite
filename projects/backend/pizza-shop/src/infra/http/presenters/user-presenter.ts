import { User } from '@/domain/store/enterprise/entities'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt ? user.updatedAt : undefined,
    }
  }
}
