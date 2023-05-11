import { FastifyInstance } from 'fastify'
import { transactionRoutes } from './transactions'

async function routes(app: FastifyInstance) {
  app.register(transactionRoutes, { prefix: 'transactions' })
}

export { routes }
