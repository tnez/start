import { describe, expect, it } from 'vitest'
import { nanoid } from 'nanoid'
import { createAction } from './factory'

type Context = {
  user: string
}

type Input = {
  id: number
}

describe('createAction', () => {
  const handler = async (ctx: Context, input: Input) => {
    if (ctx.user === 'admin' && input.id === 1) {
      return { status: 'success' }
    }
    throw new Error('Invalid operation')
  }

  it('returns a HappyResponse when operation is successful', async () => {
    const TestAction = createAction('TestAction', handler)
    const instance = new TestAction({ user: 'admin' })
    const result = await instance.run({ id: 1 })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data).toEqual({ status: 'success' })
    expect(result.metadata).toHaveProperty('correlationId')
    expect(result.metadata).toHaveProperty('runtime')
    expect(result.metadata.name).toBe('TestAction')
  })

  it('returns a SadResponse when operation fails', async () => {
    const TestAction = createAction('TestAction', handler)
    const instance = new TestAction({ user: 'guest' })
    const result = await instance.run({ id: 1 })

    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.error).toEqual('Invalid operation')
    expect(result.metadata).toHaveProperty('correlationId')
    expect(result.metadata).toHaveProperty('runtime')
    expect(result.metadata.name).toBe('TestAction')
  })

  it('uses provided correlationId when it is passed', async () => {
    const correlationId = nanoid()
    const TestAction = createAction('TestAction', handler)
    const instance = new TestAction({ user: 'admin' })
    const result = await instance.run({ id: 1 }, correlationId)

    expect(result.metadata.correlationId).toBe(correlationId)
  })
})
