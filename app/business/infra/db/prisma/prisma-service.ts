import { PrismaClient } from '@prisma/client'

declare global {
  var cachedPrisma: PrismaClient
}

let prismaService: PrismaClient

if (process.env.NODE_ENV == 'production') {
  prismaService = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ log: ['query'] })
  }
  prismaService = global.cachedPrisma
}

export { prismaService }
