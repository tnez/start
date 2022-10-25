import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export type Client = typeof client

export default client
