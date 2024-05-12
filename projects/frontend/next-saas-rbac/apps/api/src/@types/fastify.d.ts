import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser: () => Promise<{ id: string }>
  }
}
