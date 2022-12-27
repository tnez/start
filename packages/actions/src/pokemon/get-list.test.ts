import { describe, expect, it, jest } from '@jest/globals'
import { GetList, GetListContext } from './get-list'

describe('happy path', () => {
  it('should work as expected', async () => {
    // Given...
    const context = createMockContext()
    const input = { limit: 10 }
    const action = new GetList(context)

    // When...
    const result = await action.execute(input)

    // Then...
    expect(context.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    )
    expect(result).toEqual({
      ok: true,
      data: STUBBED_POKEMON_DATA,
    })
  })
})

describe('when context.fetch fails with error', () => {
  it('should return expected value', async () => {
    // Given...
    const context = createMockContext({
      ok: false,
      status: 418,
      statusText: `I'm a teapot`,
    })
    const input = { limit: 10 }
    const action = new GetList(context)

    // When...
    const result = await action.execute(input)

    // Then...
    expect(result).toStrictEqual({
      ok: false,
      errors: [new Error(`418 I'm a teapot`)],
    })
  })
})

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

function createMockContext(overrides: Partial<Response> = {}): GetListContext {
  const stubbedResponse = {
    json: async () => ({ results: STUBBED_POKEMON_DATA }),
    ok: true,
    status: 200,
    statusText: 'OK',
    ...overrides,
  }

  return {
    fetch: jest.fn().mockImplementationOnce(async () => stubbedResponse),
  } as unknown as GetListContext
}
