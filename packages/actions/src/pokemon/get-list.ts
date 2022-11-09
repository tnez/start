import * as z from 'zod'
import { external } from 'effects'
import { safelyParseError } from 'utils'
import { PokemonSchema } from './schema'
import type { ActionInput, ActionOutput } from '../types'

/**
 * What input does this action require?
 */
export type PokemonGetListInput = {
	/**
	 * Specify the number of pokemon to return.
	 * @default 20
	 */
	limit?: number
}

/**
 * What output does this action produce?
 */
export type PokemonGetListOutput = z.infer<typeof PokemonSchema>[]

/**
 * What effects does this action need?
 */
export type PokemonGetListRequiredEffects = {
	external: typeof external
}

/**
 * Configure the default effects for this action so that this work does not fall on the consumer.
 */
const configureEffects = () => ({
	external: {
		fetch: external.fetch,
	},
})

const DEFAULT_INPUT = {
	limit: 20,
}

const PayloadSchema = z.object({
	results: z.array(PokemonSchema),
})

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
	try {
		const payload = await effects.external.fetch({
			parseJson: true,
			url: `https://pokeapi.co/api/v2/pokemon?limit=${
				input.limit ?? DEFAULT_INPUT.limit
			}`,
		})
		console.log(payload)
		const data = PayloadSchema.parse(payload).results

		return {
			ok: true,
			data,
		}
	} catch (error) {
		return {
			ok: false,
			errors: [safelyParseError(error)],
		}
	}
}
