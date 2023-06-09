export type LoggerContext = {
  /**
   * If set, the logger will swallow emmitted messages rather than log. This can
   * be useful for testing so as not to clutter the test output with a bunch of
   * logs.
   *
   * @default false
   */
  swallow?: boolean
}

const DEFAULT_CONTEXT: Required<LoggerContext> = Object.freeze({
  swallow: false,
})

export class Logger {
  private readonly ctx: Required<LoggerContext>
  private metadata: Map<string, unknown> = new Map()

  constructor(context: LoggerContext = {}) {
    this.ctx = { ...DEFAULT_CONTEXT, ...context }
  }

  /**
   * Gives the ability to add additinonal context to the log at runtime. This
   * can be useful to build up context as the action is executed.
   *
   * If any metadata is present it will be logged as a JSON string after the
   * message given to `emit`.
   *
   * @example
   * logger.addMetadata('action', 'UpdateRecord')
   * logger.addMetadata('correlationId', 'abcd-1234')
   * logger.addMetadata('userObj', { id: 'user-1234', role: 'admin' })
   */
  addMetadata(key: string, value: unknown) {
    this.metadata.set(key, value)
  }

  /**
   * Emits a log to the console. If any metadata is included it will be appended
   * to the log as a JSON string.
   *
   * @example
   * logger.emit('Weeeee!')
   */
  emit(message: string) {
    const { swallow } = this.ctx

    if (swallow) {
      return
    }

    const output: string[] =
      this.metadata.size > 0
        ? [
            message,
            JSON.stringify(
              Object.fromEntries(this.metadata.entries()),
              undefined,
              2,
            ),
          ]
        : [message]

    console.log(...output)
  }
}
