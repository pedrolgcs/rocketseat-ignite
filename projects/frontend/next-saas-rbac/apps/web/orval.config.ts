import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: '../api/swagger.json',
    output: {
      target: './src/http/generated/api.ts',
      client: 'zod',
      httpClient: 'fetch',
    },
  },
})
