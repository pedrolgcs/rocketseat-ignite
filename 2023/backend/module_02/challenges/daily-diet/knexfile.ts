import path from 'node:path'
import type { Knex } from 'knex'
import { env } from '@/application/env'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite',
    useNullAsDefault: true,
    connection: {
      filename: env.DATABASE_URL,
    },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
      directory: path.join(__dirname, './db/migrations'),
    },
  },

  test: {
    client: 'sqlite',
    useNullAsDefault: true,
    connection: {
      filename: env.DATABASE_URL,
    },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
      directory: path.join(__dirname, './db/migrations'),
    },
  },

  production: {
    client: 'pg',
    connection: env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

module.exports = config
