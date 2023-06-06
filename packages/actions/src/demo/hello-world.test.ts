import { describe, expect, it } from 'vitest'
import { HelloWorld } from '.'

describe('HelloWorld', () => {
  it('returns a message with the default context and input', async () => {
    const action = new HelloWorld({})
    const result = await action.run({})

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data).toEqual({ message: 'Hello, world!' })
  })

  it('returns a message with the provided context and input', async () => {
    const action = new HelloWorld({ salutation: 'Hi' })
    const result = await action.run({ name: 'John' })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data).toEqual({ message: 'Hi, John!' })
  })
})
