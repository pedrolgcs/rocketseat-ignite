import { describe, expect, it } from 'vitest'
import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

describe('either', () => {
  it('should be able to return a success result', () => {
    const sut = doSomething(true)

    expect(sut.isRight()).toBe(true)
    expect(sut.isLeft()).toBe(false)
  })

  it('should be able to return a error result', () => {
    const sut = doSomething(false)

    expect(sut.isLeft()).toBe(true)
    expect(sut.isRight()).toBe(false)
  })
})
