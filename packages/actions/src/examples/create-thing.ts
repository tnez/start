import { safelyParseError } from 'utils'
import { Data } from 'effects'
import type { ActionInput, ActionOutput } from '../types'

/**
 * What effects does this action depend upon?
 */
export type CreateThingEffects = {
	data: Data.Client
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

/**
 * Configure the default effects for this action so that this work does not fall on the consumer.
 */
const configureEffects = () => ({
	data: Data.default,
})

/**
 * This is an example action which creates a new `thing`. A `thing` is just an arbitrary _thing_ to demonstrate how actions interact with effects as well as how we go about testing them.
 */
export async function createThing({
	effects = configureEffects(),
	input,
}: ActionInput<
	CreateThingEffects,
	CreateThingInput
>): ActionOutput<CreateThingOutput> {
	try {
		const { id } = await effects.data.thing.create({ data: input })
		return { ok: true, data: { id } }
	} catch (error) {
		return { ok: false, errors: [safelyParseError(error)] }
	}
}
