import { nanoid } from 'nanoid'

type Metadata = {
  /**
   * The correlationId is a random identifier that is established in the initial
   * action and then forwarded to any subsequent actions that the parent action
   * may initiate.
   * @example 'd7e6b3e0-1f7a-4c4b-9f4e-4e6a8d1c8b3a'
   */
  correlationId: string
  /**
   * The count of milliseconds that the action took to complete (either
   * successfully or unsuccessfully).
   * @example 1024
   */
  runtime: number
}

type HappyResponse<Output> = { ok: true; data: Output; metadata: Metadata }
type SadResponse = { ok: false; error: string; metadata: Metadata }
type Response<Output> = HappyResponse<Output> | SadResponse

export function createAction<Context, Input, Output>(
  handler: (ctx: Context, input: Input) => Promise<Output> | Output,
) {
  return class Action {
    private readonly ctx: Context

    constructor(context: Context) {
      this.ctx = context
    }

    private generateMetadata({
      correlationId,
      startTime,
    }: {
      correlationId?: string
      startTime: number
    }): Metadata {
      return {
        correlationId: correlationId ?? nanoid(),
        runtime: Date.now() - startTime,
      }
    }

    async run(input: Input, correlationId?: string): Promise<Response<Output>> {
      const startTime = Date.now()

      try {
        const data = await handler(this.ctx, input)
        return {
          ok: true as const,
          data,
          metadata: this.generateMetadata({ correlationId, startTime }),
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        return {
          ok: false as const,
          error,
          metadata: this.generateMetadata({ correlationId, startTime }),
        }
      }
    }
  }
}
