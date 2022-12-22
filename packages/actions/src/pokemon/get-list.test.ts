import { describe, expect, it, jest } from '@jest/globals'
import { getList } from './get-list'

const STUBBED_POKEMON_DATA = [
  {
    name: 'clefairy',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
  },
  {
    name: 'golbat',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png',
  },
  {
    name: 'primeape',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png',
  },
]

describe('happy path', () => {
  describe('(side) effecets', () => {
    describe('.external.fetch', () => {
      it('should be invoked with expected arguments', async () => {
        // Given...
        const effects = {
          external: {
            fetch: jest.fn().mockImplementationOnce(async () => stubResponse()),
          },
        } as any
        const input = { limit: 10 }

        // When...
        await getList({ effects, input })

        // Then...
        expect(effects.external.fetch).toHaveBeenCalledWith(
          'https://pokeapi.co/api/v2/pokemon?limit=10',
        )
      })
    })
  })

  describe('return value', () => {
    it('should return expected value', async () => {
      // Given...
      const effects = {
        external: {
          fetch: jest.fn().mockImplementationOnce(async () => stubResponse()),
        },
      } as any
      const input = {}

      // When...
      const result = await getList({ effects, input })

      // Then...
      expect(result).toEqual({
        ok: true,
        data: STUBBED_POKEMON_DATA,
      })
    })
  })
})

/**
 * Helper to stub response object.
 */
function stubResponse(options: Partial<typeof Response> = {}) {
  return {
    json: async () => ({ results: STUBBED_POKEMON_DATA }),
    ok: true,
    status: 200,
    statusText: 'OK',
    ...options,
  }
}
