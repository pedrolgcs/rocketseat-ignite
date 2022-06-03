import { Request, Response } from 'express';
import { container } from 'tsyringe';

// useCase
import { DeleteCarImagesUseCase } from './DeleteCarImagesUseCase';

class DeleteCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { car_image_ids } = request.body;

    const deleteCarImages = container.resolve(DeleteCarImagesUseCase);

    await deleteCarImages.execute({
      car_id: id,
      car_image_ids,
    });

    return response.status(201).send();
  }
}

export { DeleteCarImagesController };
