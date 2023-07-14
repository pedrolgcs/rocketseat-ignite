import { Pet } from '@/modules/pet/entities'

export type SearchManyParams = {
  city: string
}

interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(params: SearchManyParams): Promise<Pet[]>
  create(data: Pet): Promise<void>
}

export { PetsRepository }
