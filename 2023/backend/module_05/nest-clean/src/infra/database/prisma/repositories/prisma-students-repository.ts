import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '@/domain/forum/application/repositories'
import { Student } from '@/domain/forum/enterprise/entities'
import { PrismaStudentMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    const studentToDomain = PrismaStudentMapper.toDomain(student)

    return studentToDomain
  }

  async create(student: Student): Promise<void> {
    const studentToPrisma = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data: {
        ...studentToPrisma,
        role: 'STUDENT',
      },
    })
  }
}

export { PrismaStudentsRepository }
