import { Manager } from '@/domain/store/enterprise/entities'

export abstract class ManagersRepository {
  abstract findById(id: string): Promise<Manager | null>
  abstract create(manager: Manager): Promise<void>
  abstract delete(manager: Manager): Promise<void>
}
