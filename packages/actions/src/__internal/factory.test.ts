import { describe, expect, it, vi } from 'vitest'
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
    const action = createAction(handler)
    const instance = new action({ user: 'admin' })
    const result = await instance.run({ id: 1 })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data).toEqual({ status: 'success' })
    expect(result.metadata).toHaveProperty('correlationId')
    expect(result.metadata).toHaveProperty('runtime')
  })

  it('returns a SadResponse when operation fails', async () => {
    const action = createAction(handler)
    const instance = new action({ user: 'guest' })
    const result = await instance.run({ id: 1 })

    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.error).toEqual('Invalid operation')
    expect(result.metadata).toHaveProperty('correlationId')
    expect(result.metadata).toHaveProperty('runtime')
  })

  it('uses provided correlationId when it is passed', async () => {
    const correlationId = nanoid()
    const action = createAction(handler)
    const instance = new action({ user: 'admin' })
    const result = await instance.run({ id: 1 }, correlationId)

    expect(result.metadata.correlationId).toBe(correlationId)
  })
})
