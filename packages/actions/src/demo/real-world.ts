import { createAction } from '../__internal/factory'

export type RealWorldContext = {
  effects: {
    fetch: typeof fetch
    data: {
      insert: (document: unknown) => Promise<{ id: string }>
    }
  }
}

export type RealWorldInput = {
  /**
   * Number of entries to return
   * @default 100
   */
  numberOfEntries?: number
}

const DEFAULT_INPUT: Required<RealWorldInput> = Object.freeze({
  numberOfEntries: 100,
})

export type RealWorldOutput = {
  entries: number[]
}

const TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json'

async function handler(
  ctx: RealWorldContext,
  input: RealWorldInput,
): Promise<RealWorldOutput> {
  const { data, fetch } = ctx.effects
  const { numberOfEntries } = { ...DEFAULT_INPUT, ...input }

  // Fetch the top 10 entries from Hacker News.
  const response = await fetch(TOP_STORIES_URL, {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  const entries = (await response.json()).slice(0, numberOfEntries)

  for await (const id of entries) {
    await data.insert({ id })
  }

  return { entries }
}

/**
 * This is an example that attempts to demonstrate a real-world use case.
 *
 * For the purpsose of demonstration, let's assume we want to grab the first 10
 * entrires from Hacker News and persist them to a database.
 */
export const RealWorld = createAction(handler)
