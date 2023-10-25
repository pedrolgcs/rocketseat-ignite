import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Slug } from './slug'

describe('Slug', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should be able to create a new slug from text', () => {
    const now = new Date(2023, 1, 1, 0, 0, 0, 0)

    vi.setSystemTime(now)

    const sut = Slug.createFromText('An example title')

    expect(sut.value).toBe(`an-example-title-${now.getTime()}`)
  })
})
