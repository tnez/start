import { createAction } from '@tnezdev/actions'
import type { ActionHandler } from '@tnezdev/actions'

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

const handler: ActionHandler<
  RealWorldContext,
  RealWorldInput,
  RealWorldOutput
> = async (ctx, input) => {
  const { data, fetch } = ctx.effects
  const { numberOfEntries } = { ...DEFAULT_INPUT, ...input }

  ctx.logger.info('Fetching top 10 entries from Hacker News')

  // Fetch the top 10 entries from Hacker News.
  const response = await fetch(TOP_STORIES_URL, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    const message = `${response.status} ${response.statusText}`
    ctx.logger.error(message)
    throw new Error(message)
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
export const RealWorldAction = createAction('RealWorldAction', handler)
