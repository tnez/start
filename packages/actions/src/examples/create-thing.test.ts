import { describe, expect, it } from '@jest/globals'
import { CreateThing } from './create-thing'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import type { Db } from 'clients'

describe('(side) effects', () => {
  describe('context.db.thing.create', () => {
    it('should be invoked with expected arguments', async () => {
      // Given...
      const input = { title: 'Test Title', body: 'Test Body' }
      const context = createMockContext()
      const action = new CreateThing(context)

      // When...
      await action.execute(input)

      // Then...
      expect(context.db.thing.create).toHaveBeenCalledWith({
        data: input,
      })
    })
  })
})

describe('return value', () => {
  describe('for happy path', () => {
    it('should return expected value', async () => {
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
      expect(result).toEqual({
        ok: true,
        data: { id: 'TEST-UUID-1234' },
      })
    })
  })

  describe('when context.db.thing.create throws exception', () => {
    it('should return expected value', async () => {
      // Given...
      const input = {
        title: 'Test Title',
        body: 'A test body.',
      }
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
})

function createMockContext() {
  return {
    db: mockDeep<DeepMockProxy<Db>>(),
  }
}
