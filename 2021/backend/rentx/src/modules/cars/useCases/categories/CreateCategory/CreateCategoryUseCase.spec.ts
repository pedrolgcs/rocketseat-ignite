import { AppError } from '@shared/errors/AppError';

// helpers
import { CategoriesBuilder } from '@modules/cars/helpers/builders/CategoriesBuilder';

// repository
import { FakeCategoriesRepository } from '@modules/cars/repositories/fakes/FakeCategoriesRepository';

// useCase
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// inicialize
let createCategoryUseCase: CreateCategoryUseCase;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute(
      new CategoriesBuilder().build(),
    );

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('SUV');
  });

  it('should not be able to create a new category with a name already used', async () => {
    await fakeCategoriesRepository.create(
      new CategoriesBuilder().setName('same-name').build(),
    );

    await expect(() =>
      createCategoryUseCase.execute(
        new CategoriesBuilder().setName('same-name').build(),
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});
