import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// config
import authConfig from '@/config/auth';

// database
import { prisma } from '@/shared/infra/database/prismaClient';

// error
import { AuthenticateDeliverymanError } from './AuthenticateDeliverymanError';

// types
import { IAuthenticateDeliverymanDTO } from './IAuthenticateDeliverymanDTO';

class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliverymanDTO) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new AuthenticateDeliverymanError.DeliverymanDoesNotExists();
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new AuthenticateDeliverymanError.InvalidPassword();
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ username: deliveryman.username }, secret, {
      subject: deliveryman.id,
      expiresIn: expiresIn,
    });

    return token;
  }
}

export { AuthenticateDeliverymanUseCase };
