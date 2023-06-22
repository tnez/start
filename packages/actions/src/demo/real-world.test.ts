import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest'
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended'
import { RealWorld, RealWorldContext } from './real-world'

describe('RealWorld', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  let context: DeepMockProxy<RealWorldContext>
  beforeAll(() => {
    context = mockDeep<RealWorldContext>()
  })

  it('instantiates successfully', () => {
    const action = new RealWorld(context)
    expect(action).toBeInstanceOf(RealWorld)
  })

  describe('when run', () => {
    it('should invoke effects.fetch with expected arguments', async () => {
      const action = new RealWorld(context)
      await action.run({})

      expect(context.effects.fetch).toHaveBeenCalledWith(
        'https://hacker-news.firebaseio.com/v0/topstories.json',
        { headers: { Accept: 'application/json' } },
      )
    })

    describe('when effects.fetch returns valid results', () => {
      let result: any
      beforeAll(async () => {
        context.effects.fetch.mockResolvedValue({
          ok: true,
          json: async () => [1, 2, 3],
        } as any)

        const action = new RealWorld(context)
        result = await action.run({})
      })

      it('should invoke effects.data.insert for each entry', () => {
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

      it('should return expected result', () => {
        expect(result).toMatchObject({
          ok: true,
          data: {
            entries: [1, 2, 3],
          },
        })
      })

      describe('when numberOfEntries is provided', () => {
        let result: any
        beforeAll(async () => {
          const input = { numberOfEntries: 2 }
          const action = new RealWorld(context)
          result = await action.run(input)
        })

        it('should limit return up to number of entries', () => {
          expect(result.data.entries).toHaveLength(2)
        })
      })

      describe('if effects.data.insert is not ok', () => {
        let result: any
        beforeAll(async () => {
          context.effects.data.insert.mockRejectedValue(
            new Error('Something Bad'),
          )
          const action = new RealWorld(context)
          result = await action.run({})
        })

        it('should return expected result', () => {
          expect(result).toMatchObject({
            ok: false,
            error: 'Something Bad',
          })
        })
      })
    })

    describe('when effects.fetch is not OK', () => {
      let result: any
      beforeAll(async () => {
        context.effects.fetch.mockResolvedValue({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
        } as any)
        const action = new RealWorld(context)

        result = await action.run({})
      })

      it('should not invoke effects.data.insert', () => {
        expect(context.effects.data.insert).not.toHaveBeenCalled()
      })

      it('should return expected result', () => {
        expect(result).toMatchObject({
          ok: false,
          error: '401 Unauthorized',
        })
      })
    })
  })
})
