import { describe, expect, it } from '@jest/globals'
import { CreateThing, CreateThingContext } from './create-thing'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

describe('happy path', () => {
  it('should work as expected', async () => {
    // Given...
    const input = { title: 'Test Title', body: 'Test Body' }
    const context = createMockContext()
    ;(context.db.thing.create as any).mockResolvedValueOnce({
      id: 'TEST-UUID-1234',
    })
    const action = new CreateThing(context)

    // When...
    const result = await action.execute(input)

    // Then...
    expect(context.db.thing.create).toHaveBeenCalledWith({
      data: input,
    })
    expect(result).toEqual({
      ok: true,
      data: { id: 'TEST-UUID-1234' },
    })
  })
})

describe('when context.db.thing.create throws exception', () => {
  it('should return expected value', async () => {
    // Given...
    const input = { title: 'Test Title', body: 'A test body.' }
    const error = new Error('test')
    const context = createMockContext()
    ;(context.db.thing.create as any).mockRejectedValueOnce(error)
    const action = new CreateThing(context)

    // When...
    const result = await action.execute(input)

    // Then...
    expect(result).toStrictEqual({ ok: false, errors: [error] })
  })
})

function createMockContext(): CreateThingContext {
  const context = {
    db: mockDeep<DeepMockProxy<CreateThingContext['db']>>(),
  }

  return context
}
