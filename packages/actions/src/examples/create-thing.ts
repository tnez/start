import { safelyParseError } from 'utils'
import { Data } from 'effects'
import type { ActionInput, ActionOutput } from '../types'

export type CreateThingEffects = {
	data: Data.Client
}

export type CreateThingInput = {
	title: string
	body: string
}

export type CreateThingOutput = {
	id: string
}

/**
 * This is an example action which creates a new `thing`. A `thing` is just an arbitrary _thing_ to demonstrate how actions interact with effects as well as how we go about testing them.
 */

export async function createThing({
	effects,
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
