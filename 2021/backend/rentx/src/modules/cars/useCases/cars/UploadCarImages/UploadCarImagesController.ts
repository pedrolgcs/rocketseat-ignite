import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// useCase
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    // get images file name
    const images_name = images.map(file => file.filename);

    const uploadCarImages = container.resolve(UploadCarImagesUseCase);

    const carImages = await uploadCarImages.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).json(classToClass(carImages));
  }
}

export { UploadCarImagesController };
