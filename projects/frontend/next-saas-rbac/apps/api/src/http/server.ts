import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { routes } from './routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Zod
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Cors
app.register(fastifyCors)

// routes
app.register(routes)

app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP Server running on http://localhost:3333')
})
