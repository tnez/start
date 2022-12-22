import { describe, expect, it, jest } from '@jest/globals'
import { parseResponse } from './parse-response'

describe('when response.ok is false', () => {
  it('should throw expected error', async () => {
    const response = stubResponse({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })
    const parse = parseResponse()

    return expect(parse(response)).rejects.toThrow(
      'Fetch failed with 500 Internal Server Error',
    )
  })
})

describe('when response.ok is true', () => {
  describe('and { parseAs: `text` }', () => {
    it('should call response.text()', async () => {
      const response = stubResponse()
      const parse = parseResponse({ parseAs: 'text' })

      await parse(response)

      expect(response.text).toHaveBeenCalled()
    })
  })

  describe('and { parseAs: `json` }', () => {
    it('should call response.json()', async () => {
      const response = stubResponse()
      const parse = parseResponse({ parseAs: 'json' })

      await parse(response)

      expect(response.json).toHaveBeenCalled()
    })
  })
})

/**
 * Helper function to stub a Response object.
 */
function stubResponse(options: any = {}) {
  return {
    ok: true,
    json: jest.fn(),
    status: 200,
    statusText: 'OK',
    text: jest.fn(),
    ...options,
  } as Response
}
