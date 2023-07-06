import { Ong, Prisma } from '@prisma/client'

interface IOngRepository {
  findById(id: string): Promise<Ong | null>
  findByEmail(email: string): Promise<Ong | null>
  create(data: Prisma.OngUncheckedCreateInput): Promise<Ong>
}

export { IOngRepository }
