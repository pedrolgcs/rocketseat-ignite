import fs from 'fs';

import csvParse from 'csv-parse';
import { injectable, inject } from 'tsyringe';

// repository
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

// interfaces
interface IImportCategory {
  name: string;
  description: string;
}

interface IRequest {
  file: Express.Multer.File;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  private loadCategries(file: Express.Multer.File): Promise<IImportCategory[]> {
    const categories: IImportCategory[] = [];

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async ([name, description]) => {
          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', error => reject(error));
    });
  }

  public async execute({ file }: IRequest): Promise<void> {
    const categories = await this.loadCategries(file);

    categories.forEach(async category => {
      const { name, description } = category;

      const alreadyCategoryExists = await this.categoriesRepository.findByName(
        name,
      );

      if (!alreadyCategoryExists) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoriesUseCase };
