import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

function getPrismaClient(): PrismaClient {
  let client;

  if (process.env.NODE !== 'production') {
    client = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient({ log: ['query'] });
    }

    client = global.prisma;
  }

  return client;
}

export const prisma: PrismaClient = getPrismaClient();

export default prisma;
