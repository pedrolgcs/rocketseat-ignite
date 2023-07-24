import { Pet } from '@/modules/pet/entities'
import {
  Age,
  EnergyLevel,
  IndependenceLevel,
  Size,
  Category,
} from '@/types/Pet'

export type SearchManyParams = {
  city: string
  age?: Age
  energyLevel?: EnergyLevel
  size?: Size
  independenceLevel?: IndependenceLevel
  category?: Category
}

interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(params: SearchManyParams): Promise<Pet[]>
  create(data: Pet): Promise<void>
}

export { PetsRepository }
