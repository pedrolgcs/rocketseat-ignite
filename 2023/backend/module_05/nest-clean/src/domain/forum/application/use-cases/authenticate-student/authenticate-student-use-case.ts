import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { StudentsRepository } from '@/domain/forum/application/repositories'
import { WrongCredentialsError } from '../_errors'

type Request = {
  email: string
  password: string
}

type Response = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { email, password } = request

    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      throw new WrongCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}

export { AuthenticateStudentUseCase }
