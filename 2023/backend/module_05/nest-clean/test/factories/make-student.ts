import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student, StudentProps } from '@/domain/forum/enterprise/entities'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      ...override,
    },
    id,
  )

  return student
}
