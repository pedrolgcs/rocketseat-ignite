import { Repository, getRepository } from 'typeorm';

// interface
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

// dtos
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

// entities
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  public async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create(data);

    await this.ormRepository.save(rental);

    return rental;
  }

  public async save(rental: Rental): Promise<Rental> {
    return this.ormRepository.save(rental);
  }

  public async listByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.ormRepository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentals;
  }

  public async findById(id: string): Promise<Rental | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findOpenRentalByCar(
    car_id: string,
  ): Promise<Rental | undefined> {
    const openByCar = await this.ormRepository.findOne({
      where: { car_id, end_date: null },
    });

    return openByCar;
  }

  public async findOpenRentalByUser(
    user_id: string,
  ): Promise<Rental | undefined> {
    const openByUser = await this.ormRepository.findOne({
      where: { user_id, end_date: null },
    });

    return openByUser;
  }
}

export { RentalsRepository };
