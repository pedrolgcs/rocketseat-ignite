import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// database
import { prisma } from '@/shared/infra/database/prismaClient';

// config
import authConfig from '@/config/auth';

// erros
import { AuthenticateClientError } from './AuthenticateClientError';

// types
import { IAuthenticateClientDTO } from './IAuthenticateClientDTO';

class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClientDTO) {
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new AuthenticateClientError.ClientDoesNotExists();
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AuthenticateClientError.InvalidPassword();
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ username: client.username }, secret, {
      subject: client.id,
      expiresIn: expiresIn,
    });

    return token;
  }
}

export { AuthenticateClientUseCase };
