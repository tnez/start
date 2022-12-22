/// <reference lib="dom" />

import { safelyParseError } from 'utils'

type Options = {
  parseAsJson?: boolean
} & Parameters<typeof fetch>[1]

export async function fetchJson(url: string, options: Options = {}) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`)
  }

  return options.parseAsJson ? await parseJson(response) : await response.text()
}

async function parseJson(response: Response) {
  try {
    return await response.json()
  } catch (error: unknown) {
    const { message } = safelyParseError(error)
    throw new Error(`Failed to parse JSON: ${message}`)
  }
}
