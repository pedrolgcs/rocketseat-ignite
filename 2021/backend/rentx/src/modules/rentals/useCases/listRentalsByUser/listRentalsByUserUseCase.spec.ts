// helpers
import { RentalsBuilder } from '@modules/rentals/helpers/builders/RentalsBuilder';

// fakes
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';

// useCase
import { ListRentalsByUserUseCase } from './listRentalsByUserUseCase';

// inicialize
let listRentalsByUserUseCase: ListRentalsByUserUseCase;
let fakeRentalsRepository: FakeRentalsRepository;

describe('ListRentalsByUser', () => {
  beforeEach(() => {
    fakeRentalsRepository = new FakeRentalsRepository();
    listRentalsByUserUseCase = new ListRentalsByUserUseCase(
      fakeRentalsRepository,
    );
  });

  it('should be able to list rentals by user', async () => {
    const rental_01 = await fakeRentalsRepository.create(
      new RentalsBuilder()
        .setUserId('123')
        .setCarId('123')
        .setExpectedReturnDate(new Date())
        .setEndDate(new Date())
        .builder(),
    );

    const rental_02 = await fakeRentalsRepository.create(
      new RentalsBuilder()
        .setUserId('123')
        .setCarId('321')
        .setExpectedReturnDate(new Date())
        .setEndDate(new Date())
        .builder(),
    );

    const rental_03 = await fakeRentalsRepository.create(
      new RentalsBuilder()
        .setUserId('123')
        .setCarId('456')
        .setExpectedReturnDate(new Date())
        .builder(),
    );

    await fakeRentalsRepository.create(
      new RentalsBuilder()
        .setUserId('321')
        .setCarId('456')
        .setExpectedReturnDate(new Date())
        .builder(),
    );

    const rentals = await listRentalsByUserUseCase.execute({ user_id: '123' });

    expect(rentals).toHaveLength(3);
    expect(rentals).toEqual([rental_01, rental_02, rental_03]);
  });
});
