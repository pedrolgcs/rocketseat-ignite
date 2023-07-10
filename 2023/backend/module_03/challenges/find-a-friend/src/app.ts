import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env'
import { AppError } from '@/errors/AppError'
import { routes } from '@/routes'

const app = fastify()

// middlewares
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

// routes
app.register(routes)

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
