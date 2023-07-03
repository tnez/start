import { nanoid } from 'nanoid'
import * as z from 'zod'

export const Document = z.object({
  id: z.string().default(() => nanoid()),
  type: z.string(),
  version: z.string(),
  createdAt: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  updatedAt: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
  sk1: z.string().optional().nullable(),
  sk2: z.string().optional().nullable(),
  sk3: z.string().optional().nullable(),
  sk4: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  data: z.object({}),
})

export type DocumentType = z.infer<typeof Document>
