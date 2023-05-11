import { knex as setupKnex } from 'knex'
import { databaseConfig } from '@/config/database'

const knex = setupKnex(databaseConfig)

export { knex }
