import * as z from 'zod'

export const PokemonSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export type Pokemon = z.infer<typeof PokemonSchema>
