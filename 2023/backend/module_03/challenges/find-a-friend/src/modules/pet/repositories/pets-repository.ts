import { Pet } from '@/modules/pet/entities'

interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Pet): Promise<void>
}

export { PetsRepository }
