import { PrismaClient } from '@prisma/client'

export const client = new PrismaClient()

export type Client = typeof client

export default client
