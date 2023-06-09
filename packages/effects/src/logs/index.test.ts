import { describe, expect, it, vi } from 'vitest'
import { Logger } from '.'

describe('Logger', () => {
  it('should instantiate', () => {
    const logger = new Logger()
    expect(logger).toBeInstanceOf(Logger)
  })

  describe('when invoked', () => {
    it('should log to the console', () => {
      const logger = new Logger()
      const spy = vi.spyOn(console, 'log').mockImplementationOnce(() => {})

      logger.emit('something interesting')

      expect(spy).toHaveBeenLastCalledWith('something interesting')
    })
  })

  describe('when context.swallow is set', () => {
    it('should not log to the console', () => {
      const logger = new Logger({ swallow: true })
      const spy = vi.spyOn(console, 'log')

      logger.emit('something interesting')

      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('when additional runtime context is given', () => {
    it('should include context in log', () => {
      const logger = new Logger()
      const spy = vi.spyOn(console, 'log').mockImplementationOnce(() => {})

      logger.addMetadata('foo', 'baz')
      logger.addMetadata('buzz', [1, 2, 3])
      logger.emit('Hello World')

      expect(spy).toHaveBeenLastCalledWith(
        'Hello World',
        '{\n  "foo": "baz",\n  "buzz": [\n    1,\n    2,\n    3\n  ]\n}',
      )
    })
  })
})
