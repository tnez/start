/// <reference lib="dom" />

import { safelyParseError } from './safely-parse-error'

type Options = {
  /**
   * If provided, the response will be parsed as either JSON or text.
   * If not provided, the response will be returned as-is.
   */
  parseAs?: 'json' | 'text'
}

/**
 * Configure a response parser for a fetch request will perform some basic error handling and parsing of the response object.
 */
export function parseResponse(options: Options | undefined = {}) {
  return async (response: Response) => {
    try {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }

      return options.parseAs === undefined
        ? response
        : response[options.parseAs]()
    } catch (error: unknown) {
      const { message } = safelyParseError(error)
      throw new Error(message)
    }
  }
}
