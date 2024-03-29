import { Meal } from '@/application/modules/meal/entities'

export type GetBestIsDietSequenceDayResponse = {
  date: Date
  amount: number
}

interface IMealsRepository {
  find(userId: string): Promise<Meal[]>
  findById(id: string): Promise<Meal | null>
  create(data: Meal): Promise<void>
  save(date: Meal): Promise<void>
  delete(id: string): Promise<void>
  getBestIsDietSequenceDayByUser(
    userId: string,
  ): Promise<GetBestIsDietSequenceDayResponse>
}

export { IMealsRepository }
