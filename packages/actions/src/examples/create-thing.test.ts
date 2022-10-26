import { describe, expect, it } from '@jest/globals'
import { mockDeep } from 'jest-mock-extended'
import { Data } from 'effects'
import { createThing } from './create-thing'

describe('createThing', () => {
	describe('when data effect is successful', () => {
		it('should return the expected result', async () => {
			const input = {
				title: 'test',
				body: 'test',
			}
			const effects = {
				data: mockDeep<Data.Client>(),
			}
			effects.data.thing.create.mockResolvedValueOnce({
				id: 'test',
				title: 'test',
				body: 'test',
			})

			const result = await createThing({ effects, input })

			expect(result).toEqual({
				ok: true,
				data: {
					id: 'test',
				},
			})
		})
	})

	describe('when data effect fails', () => {
		it('should return the expected result', async () => {
			const input = {
				title: 'test',
				body: 'test',
			}
			const error = new Error('test')
			const effects = {
				data: mockDeep<Data.Client>(),
			}
			effects.data.thing.create.mockRejectedValueOnce(error)

			const result = await createThing({ effects, input })

			expect(result).toStrictEqual({ ok: false, errors: [error] })
		})
	})
})
