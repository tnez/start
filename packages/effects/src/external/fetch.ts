import * as nodeFetch from 'node-fetch'
import { safelyParseError } from 'utils'

export type FetchInput = nodeFetch.RequestInit & {
	parseJson?: boolean
	url: string
}

export async function fetch({ url, ...options }: FetchInput) {
	const response = await nodeFetch.default(url, options)

	if (!response.ok) {
		throw new Error(`Fetch failed: ${response.status} ${response.statusText}`)
	}

	return options.parseJson ? await parseJson(response) : await response.text()
}

async function parseJson(response: nodeFetch.Response) {
	try {
		return await response.json()
	} catch (error: unknown) {
		const { message } = safelyParseError(error)
		throw new Error(`Failed to parse JSON: ${message}`)
	}
}
