import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { Ong } from '@prisma/client'
import { IOngRepository } from '@/repositories'
import * as Errors from './errors'

type Request = {
  name: string
  email: string
  cep: string
  latitude: number
  longitude: number
  phone: string
  password: string
}

type Response = {
  ong: Ong
}

@injectable()
class CreateOngUseCase {
  constructor(
    @inject('OngRepository')
    private ongRepository: IOngRepository,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { name, phone, cep, email, latitude, longitude, password } = request

    const emailAlreadyTaken = await this.ongRepository.findByEmail(email)

    if (emailAlreadyTaken) {
      throw new Errors.EmailAlreadyUsed()
    }

    const passwordHash = await hash(password, 6)

    const ong = await this.ongRepository.create({
      name,
      email,
      password_hash: passwordHash,
      cep,
      phone,
      latitude,
      longitude,
    })

    return {
      ong,
    }
  }
}

export { CreateOngUseCase }
