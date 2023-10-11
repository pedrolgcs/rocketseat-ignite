import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { StudentsRepository } from '@/domain/forum/application/repositories'
import { Student } from '@/domain/forum/enterprise/entities'
import { StudentAlreadyExistsError } from '../_errors'

type Request = {
  name: string
  email: string
  password: string
}

type Response = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  public async execute(request: Request): Promise<Response> {
    const { name, email, password } = request

    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({
      student,
    })
  }
}

export { RegisterStudentUseCase }
