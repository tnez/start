import { describe, expect, it, jest } from '@jest/globals'
import { getList } from './get-list'

const STUBBED_POKEMON_DATA = [
	{
		id: 35,
		name: 'clefairy',
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
	},
	{
		id: 42,
		name: 'golbat',
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png',
	},
	{
		id: 57,
		name: 'primeape',
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png',
	},
]

describe('happy path', () => {
	describe('(side) effecets', () => {
		describe('.external.fetch', () => {
			it('should be invoked with expected arguments', async () => {
				// Given...
				const effects = {
					external: {
						fetch: jest.fn(),
					},
				} as any
				const input = { limit: 10 }

				// When...
				await getList({ effects, input })

				// Then...
				expect(effects.external.fetch).toHaveBeenCalledWith({
					parseJson: true,
					url: 'https://pokeapi.co/api/v2/pokemon?limit=10',
				})
			})
		})
	})

	describe('return value', () => {
		it('should return expected value', async () => {
			// Given...
			const effects = {
				external: {
					fetch: jest
						.fn()
						.mockImplementationOnce(async () => STUBBED_POKEMON_DATA),
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
