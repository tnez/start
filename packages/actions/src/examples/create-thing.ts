import { safelyParseError } from 'utils'
import type { Action } from '../action'

export type CreateThingContext = {
  db: any
}

/**
 * What input does this action require?
 */
export type CreateThingInput = {
  title: string
  body: string
}

/**
 * What output does this action produce?
 */
export type CreateThingOutput = {
  id: string
}

export class CreateThing
  implements Action<CreateThingInput, CreateThingOutput>
{
  private readonly db: CreateThingContext['db']

  constructor(context: CreateThingContext) {
    this.db = context.db
  }

  async execute(input: CreateThingInput) {
    try {
      const { id } = await this.db.thing.create({ data: input })
      return { ok: true as const, data: { id: id as string } }
    } catch (error) {
      return { ok: false as const, errors: [safelyParseError(error)] }
    }
  }
}
