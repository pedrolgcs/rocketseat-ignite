import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      avatar_url: string
      created_at: Date
    },
    meals: {
      id: string
      name: string
      description: string | null
      eat_time: Date
      is_diet: boolean
      user_id: string
      created_at?: Date
    }
  }
}
