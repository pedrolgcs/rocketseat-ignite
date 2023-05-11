import crypto from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '@/lib/knex'
import { auth } from '@/middlewares/auth'

const createTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(['credit', 'debit']),
})

const getTransactionParamsSchema = z.object({
  id: z.string().uuid(),
})

async function transactionRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', auth)

  app.get('/', { preHandler: [auth] }, async (request, reply) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .select()
      .where('session_id', sessionId)

    return reply.status(200).send({ transactions })
  })

  app.get('/:id', { preHandler: [auth] }, async (request, reply) => {
    const params = getTransactionParamsSchema.parse(request.params)
    const { sessionId } = request.cookies

    const { id } = params

    const transaction = await knex('transactions')
      .select()
      .where({
        id,
        session_id: sessionId,
      })
      .first()

    return reply.status(200).send({ transaction })
  })

  app.get('/summary', { preHandler: [auth] }, async (request, reply) => {
    const { sessionId } = request.cookies

    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return reply.status(200).send({ summary })
  })

  app.post('/', async (request, reply) => {
    const body = createTransactionBodySchema.parse(request.body)

    const { title, amount, type } = body

    const amountByType = type === 'credit' ? amount : amount * -1

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: amountByType,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}

export { transactionRoutes }
