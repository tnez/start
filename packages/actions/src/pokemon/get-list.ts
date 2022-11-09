import type { ActionInput, ActionOutput } from '../types'
/**
 * What input does this action require?
 */
export type PokemonGetListInput = Record<never, never>

/**
 * What output does this action produce?
 */
export type PokemonGetListOutput = Array<{
	id: number
	name: string
	img: string
}>

/**
 * What effects does this action need?
 */
export type PokemonGetListRequiredEffects = Record<never, never>

/**
 * Configure the default effects for this action so that this work does not fall on the consumer.
 */
const configureEffects = () => ({})

const MOCK_DATA: PokemonGetListOutput = [
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

/**
 * Return a list of pokemon.
 */
export async function getList({
	effects = configureEffects(),
	input = {},
}: ActionInput<
	PokemonGetListRequiredEffects,
	PokemonGetListInput
>): ActionOutput<PokemonGetListOutput> {
	console.log('effects...')
	console.log(effects)

	console.log('input...')
	console.log(input)

	return {
		ok: true,
		data: MOCK_DATA,
	}
}
