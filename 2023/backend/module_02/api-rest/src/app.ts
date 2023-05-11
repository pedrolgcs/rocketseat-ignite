import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { routes } from '@/routes'

const app = fastify()

// middlewares
app.register(cookie)

// routers
app.register(routes)

export { app }
