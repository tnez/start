/**
 * Take an error of unknown type and return a formal Error object.
 */
export function safelyParseError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }
  if (typeof error === 'string') {
    return new Error(error)
  }
  if (typeof error === 'object' && error !== null) {
    return new Error(JSON.stringify(error))
  }
  return new Error('Unknown error')
}
