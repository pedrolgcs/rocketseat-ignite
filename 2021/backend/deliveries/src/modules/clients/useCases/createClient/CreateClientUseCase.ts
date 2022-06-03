import { hash } from 'bcrypt';

// models
import { Clients } from '@prisma/client';

// database
import { prisma } from '@/shared/infra/database/prismaClient';

// types
import { ICreateClientDTO } from './ICreateClientDTO';

// erros
import { CreateClientError } from './CreateClientError';

class CreateClientUseCase {
  async execute({ username, password }: ICreateClientDTO): Promise<Clients> {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (clientExists) {
      throw new CreateClientError.UsernameAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return client;
  }
}

export { CreateClientUseCase };
