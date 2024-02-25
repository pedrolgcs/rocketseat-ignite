import { Customer } from '@/domain/store/enterprise/entities'

export abstract class CustomersRepository {
  abstract findById(id: string): Promise<Customer | null>
  abstract findByEmail(email: string): Promise<Customer | null>
  abstract create(customer: Customer): Promise<void>
  abstract update(customer: Customer): Promise<void>
}
