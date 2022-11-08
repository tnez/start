import { describe, expect, it } from '@jest/globals'
import { mockDeep } from 'jest-mock-extended'
import { Data } from 'effects'
import { createThing } from './create-thing'

const configureEffects = ({
	title,
	body,
	rejectWith,
}: {
	title: string
	body: string
	rejectWith?: Error
}) => {
	const data = mockDeep<Data.Client>()

	if (rejectWith) {
		data.thing.create.mockRejectedValue(rejectWith)
	} else {
		data.thing.create.mockResolvedValueOnce({
			id: 'TEST-UUID-1234',
			title,
			body,
		})
	}

	return { data }
}

describe('(side) effects', () => {
	describe('.data.thing.create', () => {
		it('should be invoked with expected arguments', async () => {
			// Given...
			const input = { title: 'Test Title', body: 'Test Body' }
			const effects = configureEffects(input)

			// When...
			await createThing({ effects, input })

			// Then...
			expect(effects.data.thing.create).toHaveBeenCalledWith({
				data: input,
			})
		})
	})
})

describe('return value', () => {
	describe('for happy path', () => {
		it('should return expected value', async () => {
			// Given...
			const input = { title: 'Test Title', body: 'Test Body' }
			const effects = configureEffects(input)

			// When...
			const result = await createThing({ effects, input })

			// Then...
			expect(result).toEqual({
				ok: true,
				data: { id: 'TEST-UUID-1234' },
			})
		})
	})

	describe('when .data.thing.create throws exception', () => {
		it('should return expected value', async () => {
			// Given...
			const input = {
				title: 'Test Title',
				body: 'A test body.',
			}
			const error = new Error('test')
			const effects = configureEffects({ ...input, rejectWith: error })

			// When...
			const result = await createThing({ effects, input })

			// Then...
			expect(result).toStrictEqual({ ok: false, errors: [error] })
		})
	})
})
