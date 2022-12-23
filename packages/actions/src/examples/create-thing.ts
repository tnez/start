import { data } from 'clients'
import { safelyParseError } from 'utils'
import type { ActionOutput } from '../types'

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

/**
 * This is an example action which creates a new `thing`. A `thing` is just an arbitrary _thing_ to demonstrate how actions interact with effects as well as how we go about testing them.
 */
export async function createThing(
  input: CreateThingInput,
): ActionOutput<CreateThingOutput> {
  try {
    const { id } = await data.thing.create({ data: input })
    return { ok: true, data: { id } }
  } catch (error) {
    return { ok: false, errors: [safelyParseError(error)] }
  }
}
