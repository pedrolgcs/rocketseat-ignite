import { knex as setupKnex } from 'knex'
import { databaseConfig } from '@/application/config/database'

const knex = setupKnex(databaseConfig)

export { knex }
