import path from 'node:path'

import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: path.resolve(__dirname, '../api/swagger.json'),
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/http/generated/heyapi',
  },
})
