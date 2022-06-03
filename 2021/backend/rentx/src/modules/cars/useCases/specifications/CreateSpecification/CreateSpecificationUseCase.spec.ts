// helpers
import { SpecificationsBuilder } from '@modules/cars/helpers/builders/SpecificationsBuilder';

// repository
import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';

// useCase
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

// inicialize
let createSpecificationUseCase: CreateSpecificationUseCase;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe('CreateSpecification', () => {
  beforeEach(() => {
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      fakeSpecificationsRepository,
    );
  });

  it('should be able to create a new specification', async () => {
    const specification = await createSpecificationUseCase.execute(
      new SpecificationsBuilder().build(),
    );

    expect(specification).toHaveProperty('id');
    expect(specification.name).toBe('v8');
  });
});
