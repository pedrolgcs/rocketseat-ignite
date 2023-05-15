import type { Knex } from 'knex'
import { env } from '@/application/env'

type Providers = Record<string, Knex.Config>

const providers: Providers = {
  sqlite: {
    client: 'sqlite',
    useNullAsDefault: true,
    connection: {
      filename: env.DATABASE_URL,
    },
  },
  pg: {
    client: 'pg',
    connection: env.DATABASE_URL,
  },
}

const databaseConfig = providers[env.DATABASE_CLIENT]

export { databaseConfig }
