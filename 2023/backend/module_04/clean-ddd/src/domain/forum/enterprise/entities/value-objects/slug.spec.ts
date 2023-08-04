import { describe, it, expect } from 'vitest'
import { Slug } from './slug'

describe('Slug', () => {
  it('should be able to create a new slug from text', () => {
    const sut = Slug.createFromText('An example title')

    expect(sut.value).toBe('an-example-title')
  })
})
