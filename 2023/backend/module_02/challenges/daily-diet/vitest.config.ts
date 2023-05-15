import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
