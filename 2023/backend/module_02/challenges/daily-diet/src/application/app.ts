import 'reflect-metadata'

import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { routes } from '@/application/routes'

// providers
import '@/application/container'

const app = fastify()

// middlewares
app.register(cookie)

// routers
app.register(routes)

export { app }
