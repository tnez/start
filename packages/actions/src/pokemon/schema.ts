import * as z from 'zod'

export const PokemonSchema = z.object({
	id: z.number(),
	name: z.string(),
	img: z.string(),
})

export type Pokemon = z.infer<typeof PokemonSchema>
