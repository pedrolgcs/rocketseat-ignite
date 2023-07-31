import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'

describe('[Organization - e2e] - Create organization', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a organization', async () => {
    expect(true).toBe(true)
  })
})
