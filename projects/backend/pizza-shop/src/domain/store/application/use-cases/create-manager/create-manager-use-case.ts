import { Either, right } from '@/core/either'
import { ManagersRepository } from '@/domain/store/application/repositories'
import { Manager } from '@/domain/store/enterprise/entities'

type Request = {
  name: string
  email: string
  phone?: string
}

type Response = Either<
  null,
  {
    manager: Manager
  }
>

export class CreateManagerUseCase {
  constructor(private readonly managersRepository: ManagersRepository) {}

  public async execute(request: Request): Promise<Response> {
    const { name, email, phone } = request

    const manager = Manager.create({
      name,
      email,
      phone,
    })

    await this.managersRepository.create(manager)

    return right({ manager })
  }
}
