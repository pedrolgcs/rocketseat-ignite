import { Elysia } from 'elysia'

export const healthCheckRouter = new Elysia().get('/health', () => {
  return 'Healthy Check'
})
