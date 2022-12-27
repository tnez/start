import * as z from 'zod'
import { parseResponse, safelyParseError } from 'utils'
import { PokemonSchema } from './schema'
import type { Action } from '../action'

export type GetListContext = {
  fetch: typeof fetch
}

/**
 * What input does this action require?
 */
export type GetListInput = {
  /**
   * Specify the number of pokemon to return.
   * @default 20
   */
  limit?: number
}

/**
 * What output does this action produce?
 */
export type GetListOutput = z.infer<typeof PokemonSchema>[]

const DEFAULT_INPUT = {
  limit: 20,
}

const PayloadSchema = z.object({
  results: z.array(PokemonSchema),
})

export class GetList implements Action<GetListInput, GetListOutput> {
  private readonly fetch: GetListContext['fetch']

  constructor(context: GetListContext) {
    this.fetch = context.fetch
  }

  async execute(input: GetListInput) {
    try {
      const response = await this.fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${
          input.limit ?? DEFAULT_INPUT.limit
        }`,
      )
      const payload = await parseResponse({ parseAs: 'json' })(response)
      const data = PayloadSchema.parse(payload).results

      return {
        ok: true as const,
        data,
      }
    } catch (error) {
      return {
        ok: false as const,
        errors: [safelyParseError(error)],
      }
    }
  }
}
