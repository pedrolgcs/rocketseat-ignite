import { inject, injectable } from 'tsyringe';

// entities
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

// interfaces
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.listByUser(user_id);

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
