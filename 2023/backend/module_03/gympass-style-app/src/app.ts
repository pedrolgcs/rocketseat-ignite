import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'
import { AppError } from '@/erros/AppError'
import { routes } from '@/http/routes'

const app = fastify()

// routes
app.register(routes)

// error handler
app.setErrorHandler((err, _, reply) => {
  if (err instanceof AppError) {
    return reply.status(err.statusCode).send({
      message: err.message,
      issues: err.issues,
      statusCode: err.statusCode,
    })
  }

  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: err.format(),
      statusCode: 400,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // implement external tool like DataDog/NewRelic/Sentry
  }

  reply.status(500).send({
    message: 'Internal server error',
    issues: null,
    statusCode: 500,
  })
})

export { app }
