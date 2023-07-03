import {
  afterAll,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  it,
  vi,
} from 'vitest'
import { Document, DocumentType } from '.'

const FAKE_NOW_TS = new Date('1970-01-01T00:00:00.000Z')

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(FAKE_NOW_TS)
})

afterAll(() => {
  vi.useRealTimers()
})

const MINIMAL_DOCUMENT_DATA = Object.freeze({
  type: 'document-type',
  version: '1.0.0',
  data: {},
})

describe('when provided minimal required data', () => {
  let document: DocumentType
  beforeAll(() => {
    document = Document.parse(MINIMAL_DOCUMENT_DATA)
  })

  it('should set the id', () => {
    expect(document.id).toBeDefined()
  })

  it('should set createdAt', () => {
    expect(document.createdAt).toBe('1970-01-01T00:00:00.000Z')
  })

  it('should set updatedAt', () => {
    expect(document.updatedAt).toBe('1970-01-01T00:00:00.000Z')
  })

  it('should result in DocumentType', () => {
    expectTypeOf(document).toEqualTypeOf<DocumentType>()
  })
})

describe('when provided overrides', () => {
  it('should accept createdAt', () => {
    const createdAt = '2055-01-01T00:00:00.000Z'
    const document = Document.parse({ ...MINIMAL_DOCUMENT_DATA, createdAt })
    expect(document.createdAt).toBe(createdAt)
  })

  it('should accept updatedAt', () => {
    const updatedAt = '1849-01-01T00:00:00.000Z'
    const document = Document.parse({ ...MINIMAL_DOCUMENT_DATA, updatedAt })
    expect(document.updatedAt).toBe(updatedAt)
  })
})
