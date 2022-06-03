import { hash } from 'bcrypt';

// database
import { prisma } from '@/shared/infra/database/prismaClient';

// types
import { ICreateDeliverymanDTO } from './ICreateDeliverymanDTO';

// erros
import { CreateDeliverymanError } from './CreateDeliverymanError';

class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliverymanDTO) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (deliverymanExists) {
      throw new CreateDeliverymanError.UsernameAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return deliveryman;
  }
}

export { CreateDeliverymanUseCase };
