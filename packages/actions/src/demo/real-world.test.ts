import { describe, it, expect, vi } from 'vitest'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'
import { RealWorldAction } from './real-world'
import type { RealWorldContext } from './real-world'

function createMockContext(
  overrides: Partial<RealWorldContext['effects']> = {},
) {
  const defaults = {
    data: mockDeep<RealWorldContext['effects']['data']>(),
    fetch: vi.fn(async () => ({
      ok: true,
      json: async () => [1, 2, 3],
    })),
  }

  return {
    effects: {
      data: overrides.data ?? defaults.data,
      fetch: overrides.fetch ?? defaults.fetch,
    },
  } as DeepMockProxy<RealWorldContext>
}

describe('RealWorld', () => {
  describe('when run', () => {
    it('should invoke effects.fetch with expected arguments', async () => {
      const context = createMockContext()

      const action = RealWorldAction.initialize(context)
      await action.run({})

      expect(context.effects.fetch).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/topstories.json',
        { headers: { Accept: 'application/json' } },
      )
    })

    describe('when effects.fetch returns valid results', () => {
      it('should invoke effects.data.insert for each entry', async () => {
        const context = createMockContext()

        const action = RealWorldAction.initialize(context)
        await action.run({})

        expect(context.effects.data.insert).toHaveBeenNthCalledWith(1, {
          id: 1,
        })
        expect(context.effects.data.insert).toHaveBeenNthCalledWith(2, {
          id: 2,
        })
        expect(context.effects.data.insert).toHaveBeenNthCalledWith(3, {
          id: 3,
        })
      })

      it('should return expected result', async () => {
        const context = createMockContext()

        const action = RealWorldAction.initialize(context)
        const result = await action.run({})

        expect(result).toMatchObject({
          ok: true,
          data: {
            entries: [1, 2, 3],
          },
        })
      })

      describe('when numberOfEntries is provided', () => {
        it('should limit return up to number of entries', async () => {
          const context = createMockContext()

          const action = RealWorldAction.initialize(context)
          const result = await action.run({ numberOfEntries: 2 })

          if (!result.ok) {
            throw new Error('Expected result to be ok')
          }

          expect(result.data.entries).toHaveLength(2)
        })
      })

      describe('if effects.data.insert is not ok', () => {
        it('should return expected result', async () => {
          const expectedError = new Error('Something Bad')
          const context = createMockContext({
            data: {
              insert: vi.fn(async () => {
                throw expectedError
              }),
            },
          })

          const action = RealWorldAction.initialize(context)
          const result = await action.run({})

          expect(result).toMatchObject({
            ok: false,
            error: expectedError,
          })
        })
      })
    })

    describe('when effects.fetch is not OK', () => {
      it('should not invoke effects.data.insert', async () => {
        const context = createMockContext({
          fetch: vi.fn(
            async () =>
              ({
                ok: false,
                status: 401,
                statusText: 'Unauthorized',
              } as any),
          ),
        })

        const action = RealWorldAction.initialize(context)
        await action.run({})

        expect(context.effects.data.insert).not.toHaveBeenCalled()
      })

      it('should return expected result', async () => {
        const context = createMockContext({
          fetch: vi.fn(
            async () =>
              ({
                ok: false,
                status: 401,
                statusText: 'Unauthorized',
              } as any),
          ),
        })

        const action = RealWorldAction.initialize(context)
        const result = await action.run({})

        expect(result).toMatchObject({
          ok: false,
          error: new Error('401 Unauthorized'),
        })
      })
    })
  })
})
