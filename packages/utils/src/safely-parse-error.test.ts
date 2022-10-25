import { describe, expect, it } from '@jest/globals'
import { safelyParseError } from './safely-parse-error'

describe('when given an error', () => {
	it('should return an Error object', () => {
		const input = new Error('test')
		const result = safelyParseError(input)

		expect(result).toEqual(input)
	})
})

describe('when given a string', () => {
	it('should return the expected Error object', () => {
		const input = 'test'
		const result = safelyParseError(input)

		expect(result).toEqual(new Error(input))
	})
})

describe('when given a object', () => {
	it('should return the expected Error object', () => {
		const input = { test: 'test' }
		const result = safelyParseError(input)

		expect(result).toEqual(new Error(JSON.stringify(input)))
	})
})

describe('when given an unexpected type', () => {
	it('should return the expected Error object', () => {
		const input = 42
		const result = safelyParseError(input)

		expect(result).toEqual(new Error('Unknown error'))
	})
})
