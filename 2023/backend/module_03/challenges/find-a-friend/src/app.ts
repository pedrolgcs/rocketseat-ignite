import path from 'node:path'
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { env } from '@/env'
import { AppError } from '@/errors/AppError'
import { routes } from '@/http/routes'

const app = fastify()

// middlewares
app.register(fastifyCookie)
app.register(fastifyMultipart)
app.register(fastifyStatic, {
  root: path.resolve('tmp'),
  prefix: '/tmp',
  wildcard: false,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
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
